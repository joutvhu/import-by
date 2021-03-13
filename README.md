# import-by

Import a module using a string reference

## Installation

```shell
npm i import-by
# or
yarn add import-by
```

## Usage

See the following example to understand how to use it

```js
// detail.js
module.exports.beverage = {
    id: 12,
    name: 'coffee'
};
```

```js
const {importBy} = require('import-by');

const beverage = importBy('./detail#beverage');

const beverageName = importBy('./detail#beverage.name', __dirname);
```
