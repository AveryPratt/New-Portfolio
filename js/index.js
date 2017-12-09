'use strict';

window.onload = function(){
    const deg = 180 / Math.PI;
    var canvas = document.getElementById('background-canvas');

    var renderer = new THREE.WebGLRenderer({canvas: canvas, antialias: true});
    renderer.setClearColor(0xbbddff);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    // Camera/Lighting
    var camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, .1, 3000);
    camera.position.y = 8;
    camera.position.z = 60;
    camera.rotateX(-5 / deg);
    
    var light = new THREE.AmbientLight(0xffffff, .25);
    var dirLight = new THREE.DirectionalLight(0xffffff, 0.5);
    dirLight.position.y = 100;
    dirLight.position.z = 0;
    
    // Geometries
    var waterPlane = new THREE.PlaneGeometry(500, 250, 250, 125);
    for (var i = 0; i <= 125; i++){
        for (var j = 0; j <= 250; j++){
            var idx = i * 251 + j;
            waterPlane.vertices[idx].y += 75;
        }
    }
    var sandPlane = new THREE.PlaneGeometry(100, 100, 100, 100);
    for (var i = 0; i <= 100; i++){
        for (var j = 0; j <= 100; j++){
            var idx = i * 101 + j;
            sandPlane.vertices[idx].z = -.0075 * Math.pow(i, 2) + .5 * i;
            sandPlane.vertices[idx].z += -.0075 * Math.pow(j, 2) + .5 * j - 11;
        }
    }
    var basePlane = new THREE.PlaneGeometry(500, 500, 1, 1);
    basePlane.translate(0, 0, -20);
    
    // Materials
    var waterPlaneMaterial = new THREE.ShaderMaterial({
        vertexShader: document.getElementById('vertexShader').textContent,
        fragmentShader: document.getElementById('fragmentShader').textContent,
        transparent: true
    });
    var sandPlaneMaterial = new THREE.MeshLambertMaterial({ color: 0xffddbb });
    var basePlaneMaterial = new THREE.MeshLambertMaterial({ color: 0x004080 });

    // Meshes
    var waterPlaneMesh = new THREE.Mesh(waterPlane, waterPlaneMaterial);
    var sandPlaneMesh = new THREE.Mesh(sandPlane, sandPlaneMaterial);
    var basePlaneMesh = new THREE.Mesh(basePlane, basePlaneMaterial);
    waterPlaneMesh.rotateX(-90 / deg);
    sandPlaneMesh.rotateX(-90 / deg);
    basePlaneMesh.rotateX(-86.5 / deg);

    // Scene
    var scene = new THREE.Scene();
    scene.add(light);
    scene.add(dirLight);
    scene.add(waterPlaneMesh);
    scene.add(sandPlaneMesh);
    scene.add(basePlaneMesh);
    
    // Loop
    var delta = 0;
    var loop = function(){
        requestAnimationFrame(loop);

        for (var i = 0; i <= 125; i++){
            for (var j = 0; j <= 250; j++){
                var idx = i * 251 + j;
                waterPlane.vertices[idx].z = Math.sin(delta + i / 3 - j / 10) * .3;
                waterPlane.vertices[idx].z += Math.sin(delta * 1.25 - i / 10 + j / 4) * .3 - 2;
            }
        }
        waterPlane.verticesNeedUpdate = true;
        waterPlane.computeFaceNormals();
        
        renderer.render(scene, camera);

        delta += .01;
    }
    loop();
};