'use strict';

// Geometries
var iceBerg = new THREE.CylinderGeometry(24, 16, 24, 24, 6);
for (var i = 0; i < 7; i++){
    for (var j = 0; j < 24; j++){
        idx = i * 24 + j;
        var mult = Math.sin(j) / 6;
        iceBerg.vertices[idx].x += mult * (iceBerg.vertices[iceBerg.vertices.length - 1].x - iceBerg.vertices[idx].x);
        iceBerg.vertices[idx].z += mult * (iceBerg.vertices[iceBerg.vertices.length - 1].z - iceBerg.vertices[idx].z);
    }
}
iceBerg.rotateZ(4 / deg);

var smallBerg = new THREE.CylinderGeometry(12, 8, 6, 12, 3);
for (var i = 0; i < 4; i++){
    for (var j = 0; j < 12; j++){
        idx = i * 12 + j;
        var mult = Math.sin(j) / 6;
        smallBerg.vertices[idx].x += mult * (smallBerg.vertices[smallBerg.vertices.length - 1].x - smallBerg.vertices[idx].x);
        smallBerg.vertices[idx].z += mult * (smallBerg.vertices[smallBerg.vertices.length - 1].z - smallBerg.vertices[idx].z);
    }
}

// Materials
var iceBergMaterial = new THREE.MeshLambertMaterial({
    color: 0xffffff,
    // wireframe: true
})

// Meshes
var iceBergMesh = new THREE.Mesh(iceBerg, iceBergMaterial);
iceBergMesh.verticesNeedupdate = true;
iceBergMesh.translateX(1220);
iceBergMesh.translateY(-12);
iceBergMesh.rotateY(-45 / deg);
var smallBergMesh = new THREE.Mesh(smallBerg, iceBergMaterial);
smallBergMesh.translateX(1140);
smallBergMesh.translateY(-4);
smallBergMesh.translateZ(-40);

// Scene
scene.add(iceBergMesh);
scene.add(smallBergMesh);

// Loop
function renderIceberg(){
    iceBergMesh.rotateY(.04 / deg);
    smallBergMesh.rotateY(-.1 / deg);
}