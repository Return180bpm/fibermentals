import { useEffect } from "react";
import ReactDOM from "react-dom";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import GUI from "lil-gui";

import "./index.css";

const objects = [];
const gui = new GUI();

function MySphereGeometry() {
    const radius = 1;
    const widthSegments = 6;
    const heightSegments = 6;
    return (
        <sphereBufferGeometry args={[radius, widthSegments, heightSegments]} />
    );
}

class AxisGridHelper {
    constructor(node, units = 10) {
        const axes = new THREE.AxesHelper(3);
        axes.material.depthTest = false;
        axes.renderOrder = 2; // after the grid
        node.add(axes);

        const grid = new THREE.GridHelper(units, units);
        grid.material.depthTest = false;
        grid.renderOrder = 1;
        node.add(grid);

        this.grid = grid;
        this.axes = axes;
        this.visible = false;
    }
    get visible() {
        return this._visible;
    }
    set visible(v) {
        this._visible = v;
        this.grid.visible = v;
        this.axes.visible = v;
    }
}

function addHelpers() {
    objects.forEach(node => {
        makeAxisGrid(node, node.name);
    });
}

function makeAxisGrid(node, label, units) {
    const helper = new AxisGridHelper(node, units);
    console.log(helper);
    gui.add(helper, "visible").name(label);
}

function SolarSystem() {
    useEffect(() => {
        addHelpers();
    }, []);

    const solarSystem = (
        <group ref={node => objects.push(node)} name="solarSystem">
            <Sun />
            <EarthOrbit />
        </group>
    );
    return solarSystem;
}

function Sun() {
    const sunMesh = (
        <mesh ref={node => objects.push(node)} scale={5} name="sun">
            <MySphereGeometry />
            <meshPhongMaterial emissive={0xffff00} />
        </mesh>
    );

    return sunMesh;
}

function EarthOrbit() {
    const earthOrbit = (
        <group
            ref={node => objects.push(node)}
            position-x={30}
            name="earthOrbit"
        >
            <Earth />
            <MoonOrbit />
        </group>
    );
    return earthOrbit;
}

function Earth() {
    const earthMesh = (
        <mesh ref={node => objects.push(node)} scale={2} name="earth">
            <MySphereGeometry />
            <meshPhongMaterial color={0x2233ff} emissive={0x122244} />
        </mesh>
    );

    return earthMesh;
}
function MoonOrbit() {
    const moonOrbit = (
        <group ref={node => objects.push(node)} position-x={5} name="moonOrbit">
            <Moon />
        </group>
    );
    return moonOrbit;
}

function Moon() {
    const moonMesh = (
        <mesh scale={1} name="moon">
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
