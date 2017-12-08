'use strict';

// window.onload = function(){
    const deg = 180 / Math.PI;
    var canvas = document.getElementById('background-canvas');

    var renderer = new THREE.WebGLRenderer({canvas: canvas, antialias: true});
    renderer.setClearColor(0xddffff);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    var camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, .1, 3000);
    camera.position.y = 50;
    camera.position.z = 120;
    camera.rotateX(-30 / deg); 
    
    var light = new THREE.AmbientLight(0xffffff, .5);
    var dirLight = new THREE.DirectionalLight(0xffffff, .5);
    dirLight.position.y = 10;
    dirLight.position.z = 100;
    dirLight.position.x = 10;
    
    var waterPlane = new THREE.PlaneGeometry(100, 100, 100, 100);
    var sandPlane = new THREE.PlaneGeometry(100, 100, 100, 100);
    for (var i = 0; i <= 100; i++){
        for (var j = 0; j <= 100; j++){
            var idx = i * 101 + j;
            sandPlane.vertices[idx].z = Math.sin(4 + i / 30 + j / 20) * 10 - 5;
            sandPlane.vertices[idx].z += Math.sin(1.5 + i / 30 - j / 40) * 10 - 5;
        }
    }
    var box = new THREE.BoxGeometry(10,10,10);
    
    var material = new THREE.ShaderMaterial({
        vertexShader: document.getElementById('vertexShader').textContent,
        fragmentShader: document.getElementById('fragmentShader').textContent
    });
    var waterPlaneMaterial = new THREE.MeshLambertMaterial({ color: 0x80bbff, side: THREE.DoubleSide });
    var sandPlaneMaterial = new THREE.MeshLambertMaterial({color: 0xffffbb });
    var boxMaterial = new THREE.MeshLambertMaterial({color: 0x806060 });
    var waterPlaneMesh = new THREE.Mesh(waterPlane, waterPlaneMaterial);
    var sandPlaneMesh = new THREE.Mesh(sandPlane, sandPlaneMaterial);
    var boxMesh = new THREE.Mesh(box, boxMaterial);
    waterPlaneMesh.rotateX(-90 / deg);
    sandPlaneMesh.rotateX(-90 / deg);

    var scene = new THREE.Scene();
    scene.add(light);
    scene.add(dirLight);
    scene.add(waterPlaneMesh);
    scene.add(sandPlaneMesh);
    // scene.add(boxMesh);
    
    var delta = 0;
    var loop = function(){
        requestAnimationFrame(loop);

        boxMesh.rotation.x += .01;
        boxMesh.rotation.y += .01;

        delta += .025;
        for (var i = 0; i <= 100; i++){
            for (var j = 0; j <= 100; j++){
                var idx = i * 101 + j;
                waterPlane.vertices[idx].z = Math.sin(delta + i / 2 - j / 10) * .4 - .2;
                waterPlane.vertices[idx].z += Math.sin(delta + i / 3 + j / 10) * .4 - .2;
                
            }
        }
        boxMesh.position.y = Math.sin(delta + 10) * 5 + Math.sin(delta + 0) * 5 - 5;
        waterPlane.verticesNeedUpdate = true;
        waterPlane.computeFaceNormals();

        renderer.render(scene, camera);
    }

    loop();

// };