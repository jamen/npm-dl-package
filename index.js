var semver = require('semver');
var request = require('https').request;

module.exports = function dl(id, callback) {
  var parts = id.split('@');
  var name = parts[0];
  var tag = parts[1] || 'latest';

  var req = request('https://registry.npmjs.org/' + name, function(resp) {
    if (resp.statusCode === 404) {
      resp.end();
      return callback(new Error('package not found'));
    }

    var collection = [];
    resp.on('data', function(chunk) {
      collection.push(chunk);
    });

    resp.on('end', function() {
      var raw = Buffer.concat(collection);
      var data = {};
      try {
        data = JSON.parse(raw);
      } catch (e) {
        return callback(e);
      }

      var pkg = null;
      var selected = data['dist-tags'][tag] || tag;
      var cleaned = semver.clean(selected);
      if (cleaned) {
        pkg = data.versions[cleaned];
      } else {
        var versions = Object.keys(data.versions).reverse();
        for (var i = 0, max = versions.length; i < max; i++) {
          if (semver.satisfies(versions[i], selected)) {
            pkg = data.versions[versions[i]];
            break;
          }
        }
      }

      if (!pkg) return callback(new Error('version/tag not found.'));

      var filereq = request(pkg.dist.tarball, function(fileresp) {
        callback(null, fileresp, pkg);
      });
      filereq.on('error', callback);
      filereq.end();
    });
  });

  req.on('error', callback);
  req.end();
};
