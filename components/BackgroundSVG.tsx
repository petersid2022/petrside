import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import utilStyles from '../styles/utils.module.css';
import Stats from 'three/examples/jsm/libs/stats.module.js';
// import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls.js';

const BackgroundSVG: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const camera = useRef<THREE.PerspectiveCamera>();
  const scene = useRef<THREE.Scene>();
  const renderer = useRef<THREE.WebGLRenderer>();
  const stats = useRef<Stats>();

  useEffect(() => {
    let mesh: THREE.Mesh;
    let geometry: THREE.PlaneGeometry;
    let material: THREE.MeshBasicMaterial;
    let clock: THREE.Clock;

    const worldWidth = 128;
    const worldDepth = 128;

    const init = () => {
      camera.current = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 20000);
      if (camera.current) {
        camera.current.position.y = 200;
      }

      clock = new THREE.Clock();

      scene.current = new THREE.Scene();
      if (scene.current) {
        //scene.current.background = new THREE.Color(0xaaccff);
        //scene.current.fog = new THREE.FogExp2(0xaaccff, 0.0007);

        scene.current.background = new THREE.Color("#0e1a40");
        scene.current.fog = new THREE.FogExp2("#0e1a40", 0.0003);
      }

      geometry = new THREE.PlaneGeometry(20000, 20000, worldWidth - 1, worldDepth - 1);
      if (geometry) {
        geometry.rotateX(-Math.PI / 2);

        const position = geometry.attributes.position;

        for (let i = 0; i < position.count; i++) {
          const y = 35 * Math.sin(i / 2);
          position.setY(i, y);
        }

        const texture = new THREE.TextureLoader().load('water.jpg');
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(5, 5);
        texture.encoding = THREE.sRGBEncoding;

        material = new THREE.MeshBasicMaterial({ color: 0x0044ff, map: texture });

        mesh = new THREE.Mesh(geometry, material);
        if (scene.current && mesh) {
          scene.current.add(mesh);
        }
      }

      renderer.current = new THREE.WebGLRenderer({ antialias: true });
      if (renderer.current) {
        renderer.current.setPixelRatio(window.devicePixelRatio);
        renderer.current.setSize(window.innerWidth, window.innerHeight);
        if (containerRef.current && renderer.current.domElement) {
          containerRef.current.appendChild(renderer.current.domElement);
        }
      }

      // controls = new FirstPersonControls(camera, renderer.domElement);
      // if (controls) {
      //   controls.movementSpeed = 500;
      //   controls.lookSpeed = 0.1;
      // }

      //stats.current = new Stats();
      //if (stats.current) {
      //  document.body.appendChild(stats.current.dom);
      //}

      window.addEventListener('resize', onWindowResize);
    };

    const onWindowResize = () => {
      if (camera.current && renderer.current) {
        camera.current.aspect = window.innerWidth / window.innerHeight;
        camera.current.updateProjectionMatrix();

        renderer.current.setSize(window.innerWidth, window.innerHeight);

        // if (controls) {
        //   controls.handleResize();
        // }
      }
    };

    const animate = () => {
      requestAnimationFrame(animate);

      render();
      if (stats.current) {
        stats.current.update();
      }
    };

    const render = () => {
      if (clock && geometry && camera.current && renderer.current) {
        const delta = clock.getDelta();
        const time = clock.getElapsedTime() * 10;

        const position = geometry.attributes.position;

        for (let i = 0; i < position.count; i++) {
          const y = 35 * Math.sin(i / 5 + (time + i) / 7);
          position.setY(i, y);
        }

        position.needsUpdate = true;

        // if (controls) {
        //   controls.update(delta);
        // }
        if (camera.current && scene.current && renderer.current) {
          renderer.current.render(scene.current, camera.current);
        }
      }
    };

    init();
    animate();

    return () => {
      window.removeEventListener('resize', onWindowResize);
    };
  }, []);

  return <div className={utilStyles.backsvg} ref={containerRef} />;
};

export default BackgroundSVG;
