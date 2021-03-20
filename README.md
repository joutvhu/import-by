# import-by

Import a module using a string reference

## Installation

Install using `pnpm`:
```shell
pnpm add import-by
```

Or `yarn`:
```shell
yarn add import-by
```

Or `npm`:
```shell
npm i import-by
```

## Usage

See the following example to understand how to use it:

- Create a file called is `detail.js`.
```js
// detail.js
module.exports.beverage = {
    id: 12,
    name: 'coffee'
};
```

- And now, you can use `importBy` method to import the property from the `detail.js` file.
```js
const {importBy} = require('import-by');

const beverage = importBy('./detail#beverage');

const beverageName = importBy('./detail#beverage.name', __dirname);
```
