'use strict';

// window.onload = function(){
    const deg = 180 / Math.PI;
    var canvas = document.getElementById('background-canvas');

    var renderer = new THREE.WebGLRenderer({canvas: canvas, antialias: true});
    renderer.setClearColor(0xddffff);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    var camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, .1, 3000);
    var scene = new THREE.Scene();

    var light = new THREE.AmbientLight(0xffffff, .5);
    var dirLight = new THREE.DirectionalLight(0xffffff, .5);
    dirLight.position.y = 100;
    dirLight.position.z = 10;
    dirLight.position.x = 10;
    scene.add(light);
    scene.add(dirLight);
    

    var geometry = new THREE.BoxGeometry(10,10,10);
    var material = new THREE.MeshLambertMaterial(0xbbbbbb);
    var mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    camera.position.y = 50;
    camera.position.z = 100;
    camera.rotateX(-30 / deg);
    mesh.rotateY(45 / deg);

    var loop = function(){
        requestAnimationFrame(loop);

        renderer.render(scene, camera);
    }

    loop();

// };