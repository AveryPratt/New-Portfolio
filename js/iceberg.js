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

var snowBall1 = new THREE.SphereBufferGeometry(2.5, 12, 12);
var snowBall2 = new THREE.SphereBufferGeometry(2, 12, 12);
var snowBall3 = new THREE.SphereBufferGeometry(1.5, 12, 12);

var fishingPole = new THREE.Geometry();
fishingPole.vertices.push(new THREE.Vector3(-1.5, 3.5, -.25));
fishingPole.vertices.push(new THREE.Vector3(-12, 12, 0));

var grip1 = new THREE.Vector3(
    fishingPole.vertices[0].x + (fishingPole.vertices[1].x - fishingPole.vertices[0].x) / 4,
    fishingPole.vertices[0].y + (fishingPole.vertices[1].y - fishingPole.vertices[0].y) / 4,
    fishingPole.vertices[0].z + (fishingPole.vertices[1].z - fishingPole.vertices[0].z) / 4,
);
var grip2 = new THREE.Vector3(
    fishingPole.vertices[0].x + (fishingPole.vertices[1].x - fishingPole.vertices[0].x) / 6,
    fishingPole.vertices[0].y + (fishingPole.vertices[1].y - fishingPole.vertices[0].y) / 6,
    fishingPole.vertices[0].z + (fishingPole.vertices[1].z - fishingPole.vertices[0].z) / 6,
);
var arm1 = new THREE.Geometry();
arm1.vertices.push(new THREE.Vector3(-1, 3.75, -1));
arm1.vertices.push(new THREE.Vector3(-2.5, 4, -1));
arm1.vertices.push(grip1);
var arm2 = new THREE.Geometry();
arm2.vertices.push(new THREE.Vector3(-1, 3.75, 2));
arm2.vertices.push(new THREE.Vector3(-3, 4.5, 1));
arm2.vertices.push(grip2);
var branch1 = new THREE.Geometry();
branch1.vertices.push(new THREE.Vector3(-3.6, 4.5, -.75));
branch1.vertices.push(new THREE.Vector3(
    arm1.vertices[1].x + (arm1.vertices[2].x - arm1.vertices[1].x) / 2,
    arm1.vertices[1].y + (arm1.vertices[2].y - arm1.vertices[1].y) / 2,
    arm1.vertices[1].z + (arm1.vertices[2].z - arm1.vertices[1].z) / 2,
));
var branch2 = new THREE.Geometry();
branch2.vertices.push(new THREE.Vector3(-3, 4.5, 1));
branch2.vertices.push(new THREE.Vector3(-3.5, 4.1, 1.25));

// Materials
var iceMaterial = new THREE.MeshLambertMaterial({
    color: 0xffffff
});
var fishingPoleMaterial = new THREE.LineBasicMaterial({
    color: 0x303030
});
var armMaterial = new THREE.LineBasicMaterial({
    color: 0x804000
});
var faceMaterial = new THREE.MeshLambertMaterial({
    map: textureLoader.load('img/speech.jpg')
})

// Meshes
var iceBergMesh = new THREE.Mesh(iceBerg, iceMaterial);
iceBergMesh.verticesNeedupdate = true;
iceBergMesh.translateX(10);
iceBergMesh.translateY(-12);

var smallBergMesh = new THREE.Mesh(smallBerg, iceMaterial);
smallBergMesh.translateX(1150);
smallBergMesh.translateY(-4);
smallBergMesh.translateZ(-60);

var snowBall1Mesh = new THREE.Mesh(snowBall1, iceMaterial);
snowBall1Mesh.translateY(.5);

var snowBall2Mesh = new THREE.Mesh(snowBall2, iceMaterial);
snowBall2Mesh.translateY(4);
snowBall2Mesh.translateZ(.2);

var snowBall3Mesh = new THREE.Mesh(snowBall3, faceMaterial);
snowBall3Mesh.translateX(-.2);
snowBall3Mesh.translateY(6.7);
snowBall3Mesh.translateZ(.1);

var fishingPoleLine = new THREE.Line(fishingPole, fishingPoleMaterial);

var arm1Line = new THREE.Line(arm1, armMaterial);
var arm2Line = new THREE.Line(arm2, armMaterial);
var branch1Line = new THREE.Line(branch1, armMaterial);
var branch2Line = new THREE.Line(branch2, armMaterial);

var snowMan = new THREE.Object3D();
snowMan.add(snowBall1Mesh);
snowMan.add(snowBall2Mesh);
snowMan.add(snowBall3Mesh);
snowMan.add(fishingPoleLine);
snowMan.add(arm1Line);
snowMan.add(arm2Line);
snowMan.add(branch1Line);
snowMan.add(branch2Line);
snowMan.translateX(-10);

var iceBergObj = new THREE.Object3D();
iceBergObj.add(iceBergMesh);
iceBergObj.add(snowMan);
iceBergObj.translateX(1220);
iceBergObj.translateZ(-20);
iceBergObj.rotateY(-45 / deg);

// Scene
scene.add(iceBergObj);
scene.add(smallBergMesh);

// Loop
function renderIceberg(){
    iceBergObj.rotateY(1 / deg);
    smallBergMesh.rotateY(-.25 / deg);
}