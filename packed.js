'use strict'

module.exports = angleNormals

function weight(s, r, a) {
  return Math.atan2(r, (s - a))
}

function angleNormals(normals, cells, positions) {
  var posDataLength, cellDataLength;

  if (!positions) {
    positions = cells
    cells = normals
    posDataLength = positions.length
    cellDataLength = cells.length
    normals = new Array(posDataLength)
  } else {
    posDataLength = positions.length
    cellDataLength = cells.length
  }

  for(var i=0; i<posDataLength; i++) {
    normals[i] = 0;
  }

  for(var cellPtr=0; cellPtr<cellDataLength; cellPtr += 3) {
    var aIdx = cells[cellPtr] * 3;
    var bIdx = cells[cellPtr + 1] * 3;
    var cIdx = cells[cellPtr + 2] * 3;

    var abx = positions[bIdx] - positions[aIdx]
    var aby = positions[bIdx + 1] - positions[aIdx + 1]
    var abz = positions[bIdx + 2] - positions[aIdx + 2]
    var ab = Math.sqrt(abx * abx + aby * aby + abz * abz);

    var bcx = positions[bIdx] - positions[cIdx]
    var bcy = positions[bIdx + 1] - positions[cIdx + 1]
    var bcz = positions[bIdx + 2] - positions[cIdx + 2]
    var bc = Math.sqrt(bcx * bcx + bcy * bcy + bcz * bcz);

    var cax = positions[cIdx] - positions[aIdx]
    var cay = positions[cIdx + 1] - positions[aIdx + 1]
    var caz = positions[cIdx + 2] - positions[aIdx + 2]
    var ca = Math.sqrt(cax * cax + cay * cay + caz * caz);

    if(Math.min(ab, bc, ca) < 1e-6) {
      continue
    }

    var s = 0.5 * (ab + bc + ca)
    var r = Math.sqrt((s - ab)*(s - bc)*(s - ca)/s)

    var nx = aby * bcz - abz * bcy
    var ny = abz * bcx - abx * bcz
    var nz = abx * bcy - aby * bcx
    var nl = Math.sqrt(nx * nx + ny * ny + nz * nz);
    nx /= nl
    ny /= nl
    nz /= nl

    var w = Math.atan2(r, s - bc);
    normals[aIdx] += w * nx;
    normals[aIdx + 1] += w * ny;
    normals[aIdx + 2] += w * nz;

    w = Math.atan2(r, s - ca);
    normals[bIdx] += w * nx;
    normals[bIdx + 1] += w * ny;
    normals[bIdx + 2] += w * nz;

    w = Math.atan2(r, s - ab);
    normals[cIdx] += w * nx;
    normals[cIdx + 1] += w * ny;
    normals[cIdx + 2] += w * nz;
  }

  //Normalize all the normals
  for(var posPtr=0; posPtr<posDataLength; posPtr+=3) {
    var l = Math.sqrt(
      normals[posPtr] * normals[posPtr] +
      normals[posPtr + 1] * normals[posPtr + 1] +
      normals[posPtr + 2] * normals[posPtr + 2]
    );

    if(l < 1e-8) {
      normals[posPtr] = 1
      normals[posPtr + 1] = 0
      normals[posPtr + 2] = 0
      continue
    }
    normals[posPtr] /= l
    normals[posPtr + 1] /= l
    normals[posPtr + 2] /= l
  }

  return normals
}
