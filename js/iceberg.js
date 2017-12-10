'use strict';

var iceBergLoc = 600;

// Geometries
var iceBerg = new THREE.CylinderGeometry(24, 16, 24, 24, 6);
for (var i = 0; i < 7; i++){
    for (var j = 0; j < 24; j++){
        idx = i * 24 + j;
        var mult = Math.sin(j) / 6;
        var verts = iceBerg.vertices;
        verts[idx].x += mult * (verts[verts.length - 1].x - verts[idx].x);
        verts[idx].z += mult * (verts[verts.length - 1].z - verts[idx].z);
    }
}
iceBerg.rotateZ(4 / deg);

var smallBerg = new THREE.CylinderGeometry(12, 8, 6, 12, 3);
for (var i = 0; i < 4; i++){
    for (var j = 0; j < 12; j++){
        idx = i * 12 + j;
        var mult = Math.sin(j) / 6;
        var verts = smallBerg.vertices;
        verts[idx].x += mult * (verts[verts.length - 1].x - verts[idx].x);
        verts[idx].z += mult * (verts[verts.length - 1].z - verts[idx].z);
    }
}

var snowBall1 = new THREE.SphereBufferGeometry(2.5, 12, 12);
var snowBall2 = new THREE.SphereBufferGeometry(2, 12, 12);
var snowBall3 = new THREE.SphereBufferGeometry(1.5, 12, 12);

var nose = new THREE.ConeBufferGeometry(.25, 1, 6, 1, true);

var fishingPole = new THREE.Geometry();
var poleVerts = fishingPole.vertices;
poleVerts.push(new THREE.Vector3(-1.5, 3.5, -.25));
poleVerts.push(new THREE.Vector3(-12, 12, 0));

var fishingLine = new THREE.Geometry();
for (var i = 0; i < 15; i++){
    fishingLine.vertices.push(new THREE.Vector3(
        poleVerts[1].x,
        poleVerts[1].y - 2 * i,
        poleVerts[1].z
    ));
}

var grip1 = new THREE.Vector3(
    poleVerts[0].x + (poleVerts[1].x - poleVerts[0].x) / 4,
    poleVerts[0].y + (poleVerts[1].y - poleVerts[0].y) / 4,
    poleVerts[0].z + (poleVerts[1].z - poleVerts[0].z) / 4,
);
var grip2 = new THREE.Vector3(
    poleVerts[0].x + (poleVerts[1].x - poleVerts[0].x) / 6,
    poleVerts[0].y + (poleVerts[1].y - poleVerts[0].y) / 6,
    poleVerts[0].z + (poleVerts[1].z - poleVerts[0].z) / 6,
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
var fishingLineMaterial = new THREE.LineBasicMaterial({
    color: 0xb0b0b0
})
var armMaterial = new THREE.LineBasicMaterial({
    color: 0x804000
});
var faceMaterial = new THREE.MeshLambertMaterial({
    map: textureLoader.load('img/smallFace-min.png')
})
var buttonMaterial = new THREE.MeshLambertMaterial({
    map: textureLoader.load('img/smallButtons-min.png')
})
var noseMaterial = new THREE.MeshLambertMaterial({
    color: 0xff8000
})

// Meshes/Lines
var iceBergMesh = new THREE.Mesh(iceBerg, iceMaterial);
iceBergMesh.verticesNeedupdate = true;
iceBergMesh.translateX(10);
iceBergMesh.translateY(-12);

var smallBergMesh = new THREE.Mesh(smallBerg, iceMaterial);
smallBergMesh.translateX(iceBergLoc - 50);
smallBergMesh.translateY(-4);
smallBergMesh.translateZ(-60);

var snowBall1Mesh = new THREE.Mesh(snowBall1, buttonMaterial);
snowBall1Mesh.translateY(.5);
snowBall1Mesh.rotateY(180 / deg);

var snowBall2Mesh = new THREE.Mesh(snowBall2, buttonMaterial);
snowBall2Mesh.translateY(4);
snowBall2Mesh.translateZ(.2);
snowBall2Mesh.rotateY(180 / deg);

var snowBall3Mesh = new THREE.Mesh(snowBall3, faceMaterial);
snowBall3Mesh.translateX(-.2);
snowBall3Mesh.translateY(6.7);
snowBall3Mesh.translateZ(.1);
snowBall3Mesh.rotateY(180 / deg);

var noseMesh = new THREE.Mesh(nose, noseMaterial);
noseMesh.translateY(6.85);
noseMesh.translateX(-1.8);
noseMesh.translateZ(.3);
noseMesh.rotateZ(90 / deg);

var fishingPoleLine = new THREE.Line(fishingPole, fishingPoleMaterial);
var fishingLineLine = new THREE.Line(fishingLine, fishingLineMaterial);

var arm1Line = new THREE.Line(arm1, armMaterial);
var arm2Line = new THREE.Line(arm2, armMaterial);
var branch1Line = new THREE.Line(branch1, armMaterial);
var branch2Line = new THREE.Line(branch2, armMaterial);

// Objects
var snowManObj = new THREE.Object3D();
snowManObj.add(snowBall1Mesh);
snowManObj.add(snowBall2Mesh);
snowManObj.add(snowBall3Mesh);
snowManObj.add(fishingPoleLine);
snowManObj.add(fishingLineLine);
snowManObj.add(arm1Line);
snowManObj.add(arm2Line);
snowManObj.add(branch1Line);
snowManObj.add(branch2Line);
snowManObj.add(noseMesh);
snowManObj.translateX(-10);

var iceBergObj = new THREE.Object3D();
iceBergObj.add(iceBergMesh);
iceBergObj.add(snowManObj);
iceBergObj.translateX(iceBergLoc + 20);
iceBergObj.translateZ(-20);
iceBergObj.rotateY(-45 / deg);

// Scene
scene.add(iceBergObj);
scene.add(smallBergMesh);

// Loop
function renderIceberg(){
    iceBergObj.rotateY((deltaTime / 1000) / deg);
    smallBergMesh.rotateY((deltaTime / 1000) / deg);
}