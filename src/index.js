import { useEffect } from "react";
import ReactDOM from "react-dom";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import "./index.css";

const objects = [];

function MySphereGeometry() {
    const radius = 1;
    const widthSegments = 6;
    const heightSegments = 6;
    return (
        <sphereBufferGeometry args={[radius, widthSegments, heightSegments]} />
    );
}

function addAxesHelpers() {
    objects.forEach(node => {
        const axes = new THREE.AxesHelper(3);
        axes.material.depthTest = false;
        axes.renderOrder = 1;
        node.add(axes);
    });
}

function makeGrid(node, label, units) {
    const size = 10;
    const divisions = 10;

    const helper = new THREE.GridHelper(size, divisions);
}
function SolarSystem() {
    useEffect(() => {
        addAxesHelpers();
    }, []);

    const solarSystem = (
        <group ref={node => objects.push(node)}>
            <Sun />
            <EarthOrbit />
        </group>
    );
    return solarSystem;
}

function Sun() {
    const sunMesh = (
        <mesh ref={node => objects.push(node)} scale={5}>
            <MySphereGeometry />
            <meshPhongMaterial emissive={0xffff00} />
        </mesh>
    );

    return sunMesh;
}

function EarthOrbit() {
    const earthOrbit = (
        <group ref={node => objects.push(node)} position-x={30}>
            <Earth />
            <MoonOrbit />
        </group>
    );
    return earthOrbit;
}

function Earth() {
    const earthMesh = (
        <mesh ref={node => objects.push(node)} scale={2}>
            <MySphereGeometry />
            <meshPhongMaterial color={0x2233ff} emissive={0x122244} />
        </mesh>
    );

    return earthMesh;
}
function MoonOrbit() {
    const moonOrbit = (
        <group ref={node => objects.push(node)} position-x={5}>
            <Moon />
        </group>
    );
    return moonOrbit;
}

function Moon() {
    const moonMesh = (
        <mesh scale={1}>
            <MySphereGeometry />
            <meshPhongMaterial color={0x888888} emissive={0xaa7722} />
        </mesh>
    );

    return moonMesh;
}

function Animate() {
    useFrame(({ clock }) => {
        if (objects.length === 0) return null;

        const time = clock.getElapsedTime();
        objects.forEach(obj => {
            obj.rotation.y = time / 2;
        });
    });

    return null;
}

function App() {
    return (
        <div id="canvas-container">
            <Canvas
                camera={{
                    fov: 75,
                    position: [0, 50, 0],
                }}
                onCreated={({ camera }) => {
                    camera.up.set(0, 0, 1);
                    camera.lookAt(0, 0, 0);
                }}
            >
                {/* <ambientLight /> */}
                <pointLight args={[0xffffff, 3]} position={[0, 0, 0]} />

                <SolarSystem />

                <Animate />
                {/* <mesh position={[0, -10, 0]}>
                    <boxBufferGeometry args={[2, 2, 2]}></boxBufferGeometry>
                    <meshPhongMaterial />
                </mesh> */}
            </Canvas>
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById("root"));
