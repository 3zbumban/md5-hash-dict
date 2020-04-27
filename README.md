# md5-hash-dict

## example

```js
const { analyseArray } = require("md5-hash-dict")

const paths = ["C:\\"]
const extensions = ["mp3", "txt"]

const result = analyseArray(paths, extensions)
```

## dependencies

* [walk](https://www.npmjs.com/package/walk)
* [md5-file](https://www.npmjs.com/package/md5-file)
