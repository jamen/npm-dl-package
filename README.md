# npm-dl-package
> Download a package from npm's registry given a name with optional versioning/tags.

```javascript
var dl = require('npm-dl-package');
var write = require('fs').createWriteStream;

dl('audio@~1.0.0', function(err, file, info) {
  if (err) throw err;
  file.pipe(write('./' info._id '.tgz'));
});
```

## Installation
```shell
$ npm install --save npm-dl-package
```

## API
### `dl(id, callback)`
Download a package off [npm's registry][npm-registry], with optional versioning/tags.

 - `id` (`String`): Package name to download, with optional version or tag. (i.e. `audio`, `audio@~1.0.0`, `audio@latest`)
 - `callback` (`Function`): Callback function to handle results.

### `callback(err, file, info)`
 - `err` (`Error`|`null`): An error to handle, otherwise null.
 - `file` (`Stream`): An `IncommingMessage` stream of the package file.
 - `pkg` (`Object`): Extra information about the package.

## Credits
| ![jamen][avatar] |
|:---:|
| [Jamen][github] |

[avatar]: https://avatars.githubusercontent.com/u/6251703?v=3&s=125
[github]: https://github.com/jamen
[npm-registry]: https://docs.npmjs.com/misc/registry
