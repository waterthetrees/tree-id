# tree-id
Generate a unique tree id based on properties of the tree (e.g. sourceId or city, species or scientific name, lat/lng coordinates).

## Usage:

Install this library as a dependency in your project:

```shell
npm install --save @waterthetrees/tree-id
```

Import and use the module:

```js
import { createIdForTree } from '@waterthetrees/tree-id';

const treeId = createIdForTree({
  species: 'Lagerstromia Indica',
  city: 'san_francisco',
  lat: 37.713225870641935,
  lng: -122.45009922742373,
});

console.log(treeId);
```

```js
import { createIdForTree } from '@waterthetrees/tree-id';

const treeId = createIdForTree({
  scientific: 'Lagerstromia Indica',
  sourceId: 'san_francisco',
  lat: 37.713225870641935,
  lng: -122.45009922742373,
});

console.log(treeId);
```