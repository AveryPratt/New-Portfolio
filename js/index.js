'use strict';

window.onload = function(){
    var canvas = document.getElementById('background-canvas');
    var renderer = new THREE.WebGLRenderer({canvas: canvas, antialias: true});
    renderer.setClearColor(0x00ff00);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    var camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, .1, 3000);
    var scene = new THREE.Scene();

    var light = new THREE.AmbientLight(0xffffff, .5);
    var light1 = new THREE.PointLight(0xffffff, .5);
    light1.position.x = 50;
    light1.position.z = 50;
    light1.position.y = 100;

    var geometry = new THREE.BoxGeometry(10,10,10);
    var material = new THREE.MeshLambertMaterial(0xbbbbbb);
    var mesh = new THREE.Mesh(geometry, material);
    
    scene.add(light);
    scene.add(light1);
    scene.add(mesh);
    camera.position.z = 100;

    var loop = function(){
        requestAnimationFrame(loop);

        mesh.rotateX(.008);
        mesh.rotateY(.01);
        mesh.rotateZ(.012);

        renderer.render(scene, camera);
    }

    loop();

};