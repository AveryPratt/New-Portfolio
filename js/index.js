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
    var scene = new THREE.Scene();

    var light = new THREE.AmbientLight(0xffffff, .5);
    var dirLight = new THREE.DirectionalLight(0xffffff, .5);
    dirLight.position.y = 10;
    dirLight.position.z = 100;
    dirLight.position.x = 10;
    scene.add(light);
    scene.add(dirLight);
    
    var plane = new THREE.PlaneGeometry(100, 100, 100, 100);
    var box = new THREE.BoxGeometry(10,10,10);

    var delta = 0;
    var planeMaterial = new THREE.MeshLambertMaterial({ color: 0x80bbff, side: THREE.DoubleSide });
    var boxMaterial = new THREE.MeshLambertMaterial({color: 0x806060 })
    var planeMesh = new THREE.Mesh(plane, planeMaterial);
    var boxMesh = new THREE.Mesh(box, boxMaterial);
    scene.add(planeMesh);
    scene.add(boxMesh);
    planeMesh.rotateX(-90 / deg);

    var loop = function(){
        requestAnimationFrame(loop);

        boxMesh.rotation.x += .01;
        boxMesh.rotation.y += .01;

        delta += .015;
        for (var i = 0; i <= 100; i++){
            for (var j = 0; j <= 100; j++){
                var idx = i * 101 + j;
                plane.vertices[idx].z = Math.sin(delta + i / 10 - j / 20) * 10 - 5;
            }
        }
        boxMesh.position.y = Math.sin(delta + 2.5) * 10 - 5;
        plane.verticesNeedUpdate = true;
        plane.computeFaceNormals();

        renderer.render(scene, camera);
    }

    loop();

// };