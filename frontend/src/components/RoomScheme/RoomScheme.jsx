import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { EventControls } from '../../controls/EventControl';

export default function RoomScheme() {
  const containerRef = useRef(null);
  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
  };

  useEffect(() => {
    let camera, scene, renderer, orbitControl, eventControl;
    const dragObjects = [];
    const clsObjects = [];


    function init() {
      const container = containerRef.current;
      camera = new THREE.OrthographicCamera(
        sizes.width / -2, // left
        sizes.width / 2, // right
        sizes.height / 2, // top
        sizes.height / -2, // bottom
        1, // near
        2500 // far
      );
      
      camera.position.set(0, 800 * Math.tan(Math.PI / 2 - Math.PI / 3), 800);
      camera.lookAt(new THREE.Vector3(0, 0, 0));
      
      scene = new THREE.Scene();
      scene.background = new THREE.Color(0xf0f0f0);

      scene.add(new THREE.AmbientLight(0x505050));

      const light = new THREE.DirectionalLight(0xFFFFFF, 1.0);
      light.position.set(1, 1, 1);
      scene.add(light);

      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(sizes.width, sizes.height);
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFShadowMap;

      container.appendChild(renderer.domElement);

      // CONTROLS
      orbitControl = new OrbitControls(camera, renderer.domElement);
      orbitControl.addEventListener('change', render);
      orbitControl.rotateSpeed = 0.3;
      orbitControl.enableZoom = true;
      orbitControl.enableRotate = false;
      orbitControl.zoomSpeed = 0.3;
      orbitControl.minDistance = 1500;
      orbitControl.maxDistance = 2300;
      orbitControl.minPolarAngle = -Math.PI; 
      orbitControl.maxPolarAngle = -Math.PI; 
      orbitControl.minAzimuthAngle = -Infinity;
      orbitControl.maxAzimuthAngle = Infinity;

      const material = new THREE.MeshBasicMaterial({ color: 0xABB2B9 , side: THREE.DoubleSide });

      const geometry = new THREE.PlaneGeometry(700, 500, 1, 1);
      const checkerboard = new THREE.Mesh(geometry, material);
      checkerboard.position.y = -1;
      checkerboard.rotation.x = Math.PI / 2;
      scene.add(checkerboard);

      const radius = 50;
      const h = 50;
      const segments = 20;
      const boxGeometry = new THREE.BoxGeometry(radius, radius, h, segments);
      const boxMaterial = new THREE.MeshPhongMaterial({ color: 0x000000 });

      for (let i = 0; i < 1; i++) {
        const checker = new THREE.Mesh(boxGeometry, boxMaterial);
        checker.position.set(0, h / 2, 0);
        scene.add(checker);
        dragObjects.push(checker);
        clsObjects.push(checker);
      }


      eventControl = new EventControls([...dragObjects], camera, renderer.domElement);
      eventControl.setDraggable(render, true);
      eventControl.setMap(checkerboard);
      eventControl.setOrbitControl(orbitControl);
      eventControl.addCollisions(clsObjects, 0.65);

      eventControl.attachEvent('mouseUp', function () {
        //this.event.object.position.x = 25 + 50 * Math.round((this.event.object.position.x - 25) / 50);
        //this.event.object.position.z = 25 + 50 * Math.round((this.event.object.position.z - 25) / 50);
        render();
      });

      window.addEventListener('resize', onWindowResize);
    }

    function onWindowResize() {
      sizes.width = window.innerWidth;
      sizes.height = window.innerHeight;

      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();

      renderer.setSize(sizes.width, sizes.height);

      render();
    }

    function render() {
      renderer.render(scene, camera);
    }

    init();

    return () => {
      window.removeEventListener('resize', onWindowResize);
      containerRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return <div id="container" ref={containerRef}></div>;
}