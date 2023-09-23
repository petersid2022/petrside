import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { vertexShader, fragmentShader } from './shaders'; // Adjust the import path
import utilStyles from '../styles/utils.module.css';

const ShaderDemo: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let camera: THREE.OrthographicCamera;
    let scene: THREE.Scene;
    let renderer: THREE.WebGLRenderer;
    let uniforms: { [key: string]: { value: number } };

    const init = () => {
      const container = containerRef.current!;

      camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

      scene = new THREE.Scene();

      const geometry = new THREE.PlaneGeometry(2, 2);

      uniforms = {
        time: { value: 1.0 },
      };

      const material = new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
      });

      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);

      renderer = new THREE.WebGLRenderer();
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight);
      container.appendChild(renderer.domElement);

      window.addEventListener('resize', onWindowResize);
    };

    const onWindowResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    const animate = () => {
      requestAnimationFrame(animate);

      uniforms['time'].value = performance.now() / 1000;

      renderer.render(scene, camera);
    };

    init();
    animate();

    // Clean up on unmount
    return () => {
      window.removeEventListener('resize', onWindowResize);
    };
  }, []);

  return <div className={utilStyles.backsvg} ref={containerRef} />;
};

export default ShaderDemo;

