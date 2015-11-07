'use strict'

var viewer = require('mesh-viewer')({
  clearColor: [0,0,0,1]
})
var bunny = require('bunny')
var sc = require('simplicial-complex')
var normals = require('./angle-normals')

var meshes = []

viewer.on('viewer-init', function() {
  meshes.push(viewer.createMesh({
    cells: bunny.cells,
    positions: bunny.positions,
    meshColor: [0.5, 0.5, 0.5, 1],
    vertexNormals: normals(bunny.cells, bunny.positions)
  }))
})

viewer.on('gl-render', function() {
  meshes.forEach(function(mesh) {
    mesh.draw()
  })
})
