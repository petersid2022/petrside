import * as THREE from 'three';
import React, { useEffect, useRef } from 'react';
import utilStyles from '../styles/utils.module.css';

const BackgroundSVG: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let container: HTMLDivElement;
        let camera: THREE.PerspectiveCamera;
        let scene: THREE.Scene;
        let raycaster: THREE.Raycaster;
        let renderer: THREE.WebGLRenderer;
        let parentTransform: THREE.Object3D;
        let sphereInter: THREE.Mesh;
        let pointer = new THREE.Vector2();
        let radius = 150;
        let theta = 0;

        const init = () => {
            container = containerRef.current!;
            document.body.appendChild(container);

            camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 1, 10000);

            scene = new THREE.Scene();
            scene.background = new THREE.Color(0xf0f0f0);

            const geometry = new THREE.SphereGeometry(5);
            const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });

            sphereInter = new THREE.Mesh(geometry, material);
            sphereInter.visible = false;
            scene.add(sphereInter);

            const lineGeometry = new THREE.BufferGeometry();
            const points: number[] = [];

            const point = new THREE.Vector3();
            const direction = new THREE.Vector3();

            for (let i = 0; i < 100; i++) {
                direction.x += Math.random() - 0.5;
                direction.y += Math.random() - 0.5;
                direction.z += Math.random() - 0.5;
                direction.normalize().multiplyScalar(10);

                point.add(direction);
                points.push(point.x, point.y, point.z);
            }

            lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(points, 3));

            parentTransform = new THREE.Object3D();
            parentTransform.position.x = Math.random() * 40 - 20;
            parentTransform.position.y = Math.random() * 40 - 20;
            parentTransform.position.z = Math.random() * 40 - 20;

            parentTransform.rotation.x = Math.random() * 2 * Math.PI;
            parentTransform.rotation.y = Math.random() * 2 * Math.PI;
            parentTransform.rotation.z = Math.random() * 2 * Math.PI;

            parentTransform.scale.x = Math.random() + 0.5;
            parentTransform.scale.y = Math.random() + 0.5;
            parentTransform.scale.z = Math.random() + 0.5;

            for (let i = 0; i < 85; i++) {
                let object: THREE.Line;
                const lineMaterial = new THREE.LineBasicMaterial({ color: Math.random() * 0xffffff });


                if (Math.random() > 0.5) {
                    object = new THREE.Line(lineGeometry, lineMaterial);
                } else {
                    object = new THREE.LineSegments(lineGeometry, lineMaterial);
                }

                object.position.x = Math.random() * 400 - 200;
                object.position.y = Math.random() * 400 - 200;
                object.position.z = Math.random() * 400 - 200;

                object.rotation.x = Math.random() * 2 * Math.PI;
                object.rotation.y = Math.random() * 2 * Math.PI;
                object.rotation.z = Math.random() * 2 * Math.PI;

                object.scale.x = Math.random() + 0.5;
                object.scale.y = Math.random() + 0.5;
                object.scale.z = Math.random() + 0.5;

                parentTransform.add(object);
            }

            scene.add(parentTransform);

            raycaster = new THREE.Raycaster();
            raycaster.params.Line.threshold = 0;

            renderer = new THREE.WebGLRenderer({ antialias: true });
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setSize(window.innerWidth, window.innerHeight);
            container.appendChild(renderer.domElement);

            document.addEventListener('pointermove', onPointerMove);

            window.addEventListener('resize', onWindowResize);
        };

        const onWindowResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };

        const onPointerMove = (event: MouseEvent) => {
            pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
            pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
        };

        const animate = () => {
            requestAnimationFrame(animate);
            render();
        };

        const render = () => {
            theta += 0.1;

            camera.position.x = radius * Math.sin(THREE.MathUtils.degToRad(theta));
            camera.position.y = radius * Math.sin(THREE.MathUtils.degToRad(theta));
            camera.position.z = radius * Math.cos(THREE.MathUtils.degToRad(theta));
            camera.lookAt(scene.position);

            camera.updateMatrixWorld();

            // find intersections

            raycaster.setFromCamera(pointer, camera);

            const intersects = raycaster.intersectObjects(parentTransform.children, true);

            if (intersects.length > 0) {
                sphereInter.visible = true;
                sphereInter.position.copy(intersects[0].point);
            } else {
                sphereInter.visible = false;
            }

            renderer.render(scene, camera);
        };

        init();
        animate();

        // Clean up on unmount
        return () => {
            if (containerRef.current) {
                containerRef.current.removeChild(renderer.domElement);
            }
            window.removeEventListener('resize', onWindowResize);
            document.removeEventListener('pointermove', onPointerMove);
        };
    }, []);

    return (
        <div className={utilStyles.backsvg} ref={containerRef} />
    );
};

export default BackgroundSVG;
