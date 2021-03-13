# import-by

Import a module using a string reference

## Installation

```shell
npm i import-by
# or
yarn add import-by
```

## Usage

```js
// info.js
let i = 0;
module.exports.name = {
    first: 'Giao',
    second: 'Ho'
};
```

```js
const {importBy} = require('import-by');

const name = importBy('./info#name');

const firstName = importBy('./info#name.first', __dirname);

```
