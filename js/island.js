'use strict';

var islandLoc = 0;

// Geometries
var sandPlane = new THREE.PlaneGeometry(200, 200, 100, 100);
for (var i = 0; i <= 100; i++){
    for (var j = 0; j <= 100; j++){
        var idx = i * 101 + j;
        sandPlane.vertices[idx].z = -.015 * Math.pow(i, 2) + 1.5 * i;
        sandPlane.vertices[idx].z += -.015 * Math.pow(j, 2) + 1.5 * j - 73;
    }
}
sandPlane.rotateX(-90 / deg);

// Materials
var sandPlaneMaterial = new THREE.ShaderMaterial({
    vertexShader: document.getElementById('sandVertex').textContent,
    fragmentShader: document.getElementById('sandFragment').textContent,
    // wireframe: true
});

// Meshes
var sandPlaneMesh = new THREE.Mesh(sandPlane, sandPlaneMaterial);
sandPlaneMesh.translateX(islandLoc - 20);

// Scene
scene.add(sandPlaneMesh);

// Loop
function renderIsland(){

}