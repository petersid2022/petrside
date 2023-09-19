import * as THREE from 'three';
import React, { useEffect } from 'react';
import utilStyles from '../styles/utils.module.css';

const BackgroundSVG: React.FC = () => {
    useEffect(() => {
        const canvas = document.getElementById('webgl-canvas') as HTMLCanvasElement;

        // Create a scene, camera, and renderer
        const scene = new THREE.Scene();

        // Define the dimensions for the OrthographicCamera
        const left = -1;
        const right = 1;
        const top = 1;
        const bottom = -1;
        const near = 0;
        const far = -1;

        // Calculate the aspect ratio based on window dimensions
        const aspect = window.innerWidth / window.innerHeight;

        const camera = new THREE.OrthographicCamera(
            left * aspect,
            right * aspect,
            top,
            bottom,
            near,
            far
        );

        const renderer = new THREE.WebGLRenderer({ canvas });

        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setClearColor(0x666666);
        renderer.setSize(window.innerWidth, window.innerHeight);

        // Create a mesh
        const geometry = new THREE.BufferGeometry();
        const position = new Float32Array([
            -1.0, -1.0, 0.0,
            1.0, -1.0, 0.0,
            -1.0, 1.0, 0.0,
            1.0, -1.0, 0.0,
            -1.0, 1.0, 0.0,
            1.0, 1.0, 0.0,
        ]);
        geometry.setAttribute('position', new THREE.BufferAttribute(position, 3));

        const vertexShader = `
      attribute vec3 position;
      void main() {
        gl_Position = vec4(position, 1.0);
      }
    `;

        const fragmentShader = `
      precision highp float;
      uniform vec2 resolution;
      uniform float time;
      uniform float xScale;
      uniform float yScale;
      uniform float distortion;

      void main() {
        vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
        float d = length(p) * distortion;

        float rx = p.x * (1.0 + d);
        float gx = p.x;
        float bx = p.x * (1.0 - d);

        float r = 0.05 / abs(p.y + sin((rx + time) * xScale) * yScale);
        float g = 0.05 / abs(p.y + sin((gx + time) * xScale) * yScale);
        float b = 0.05 / abs(p.y + sin((bx + time) * xScale) * yScale);

        gl_FragColor = vec4(r, g, b, 1.0);
      }
    `;

        const uniforms = {
            resolution: { type: 'v2', value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
            time: { type: 'f', value: 0.0 },
            //xScale: { type: 'f', value: 1.0 },
            //yScale: { type: 'f', value: 0.5 },
            //distortion: { type: 'f', value: 0.05 },
            xScale: { type: 'f', value: 5.0 },
            yScale: { type: 'f', value: 0.2 },
            distortion: { type: 'f', value: 0.1 },
        };

        const material = new THREE.RawShaderMaterial({
            vertexShader,
            fragmentShader,
            uniforms,
            side: THREE.DoubleSide,
        });

        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        // Animation
        const animate = () => {
            requestAnimationFrame(animate);

            // Update shader time
            //uniforms.time.value += 0.01;
            uniforms.time.value += 0.005;

            renderer.render(scene, camera);
        };

        // Handle window resize
        const onResize = () => {
            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;

            const newAspect = windowWidth / windowHeight;

            // Update the camera's dimensions based on the new aspect ratio
            camera.left = left * newAspect;
            camera.right = right * newAspect;
            camera.top = top;
            camera.bottom = bottom;

            camera.updateProjectionMatrix();

            renderer.setSize(windowWidth, windowHeight);
            uniforms.resolution.value.set(windowWidth, windowHeight);
        };

        const isDesktop = window.innerWidth >= 768; // Adjust the breakpoint as needed

        if (isDesktop && typeof window !== 'undefined') {
            // Only attach event listeners and create dat.gui if in the browser environment
            window.addEventListener('resize', onResize);

            // Start animation loop
            animate();

            // Optional: Set up GUI controls using dat.gui
            const dat = require('dat.gui'); // Import dat.gui here
            const gui = new dat.GUI();
            gui.closed = true;
            gui.add(uniforms.xScale, 'value', 1.0, 5.0).name('X Scale');
            gui.add(uniforms.yScale, 'value', 0.2, 1.0).name('Y Scale');
            gui.add(uniforms.distortion, 'value', 0.001, 0.1).name('Distortion');
        }
    }, []);

    return <div className={utilStyles.backsvg}><canvas id="webgl-canvas"></canvas></div>;
};

export default BackgroundSVG;

