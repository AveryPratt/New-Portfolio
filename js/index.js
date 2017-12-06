'use strict';

window.onload = function(){
    var canvas = document.getElementById('background-canvas');
    var ctx = canvas.getContext('webgl');

    var scene = THREE.Scene();
    var camera = THREE.PerspectiveCamera();
    var renderer = THREE.WebGLRenderer();

    var geometry = new THREE.BoxGeometry(10,10,10);
    var mesh = new THREE.Mesh(geometry);

    scene.add(mesh);
    camera.position.z = 100;

    var loop = function(){
        requestAnimationFrame(loop);

        renderer.render(scene, camera);
        ctx.render(scene, camera);
    }

    loop();
};