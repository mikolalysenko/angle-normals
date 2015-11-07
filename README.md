angle-normals
=============
Computes vertex normals for a mesh using angle weights.  This is slower, but produces results which are more robust to the mesh subdivision.

# Install
Angle normals

```
npm i angle-normals
```

# Example

```javascript
var bunny = require('bunny')
var normals = require('angle-normals')(bunny.cells, bunny.positions)

console.log(normals)
```

# API

#### `require('angle-normals')(cells, positions)`
Computes vertex normals from for a mesh.

* `cells` are the cells of the mesh
* `positions` are the positions of the mesh's vertices

**Returns** An array of normals

# License
(c) 2015 Mikola Lysenko. MIT License
