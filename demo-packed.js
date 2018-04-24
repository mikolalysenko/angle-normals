'use strict'

var bunny = require('bunny')

// Convert to packed data:
var pack = require('array-pack-2d')
bunny.cells = pack(bunny.cells, Uint16Array)
bunny.positions = pack(bunny.positions)

var normals = require('./packed')

console.log('normals[0...9]:\n', normals(bunny.cells, bunny.positions).slice(0, 9))

console.log('\nin-place variant: normals[0...9]:\n', normals([], bunny.cells, bunny.positions).slice(0, 9))
