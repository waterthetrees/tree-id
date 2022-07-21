# tree-id
Generate a unique tree id based on properties of the tree (e.g. common and scientific name, lat/lng coordinates).

## Usage:

Install this library as a dependency in your project:

```shell
npm install --save @waterthetrees/tree-id
```

Import and use the module:

```js
import { createIdForTree } from '@waterthetrees/tree-id';

const treeId = createIdForTree({
  id: 125,
  common: 'Crape Myrtle',
  scientific: 'Lagerstromia Indica',
  city: 'San Francisco',
  datePlanted: '2022-01-28T11:41:03.818Z',
  lat: 37.713225870641935,
  lng: -122.45009922742373,
});

console.log(treeId);
```
