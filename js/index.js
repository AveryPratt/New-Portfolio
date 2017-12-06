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
    dirLight.position.y = 10;
    dirLight.position.z = 10;
    dirLight.position.x = 100;
    scene.add(light);
    scene.add(dirLight);
    
    var geometry = new THREE.PlaneGeometry(100, 100, 10, 10);
    var delta = 0;
    var material = new THREE.MeshLambertMaterial(0xff0000);
    var mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    camera.position.y = 50;
    camera.position.z = 120;
    camera.rotateX(-30 / deg);
    mesh.rotateX(-90 / deg);

    var loop = function(){
        requestAnimationFrame(loop);

        delta += .015;
        for (var i = 0; i <= 10; i++){
            for (var j = 0; j <= 10; j++){
                var idx = i * 11 + j;
                geometry.vertices[idx].z = Math.sin(delta + i / 5 - j / 10) * 10 - 5;
            }
        }
        geometry.verticesNeedUpdate = true;

        renderer.render(scene, camera);
    }

    loop();

// };