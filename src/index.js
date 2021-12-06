import ReactDOM from "react-dom";
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

function Sun() {
    const sphereMesh = (
        <mesh ref={node => objects.push(node)} scale={5}>
            <MySphereGeometry />
            <meshPhongMaterial emissive={0xffff00} />
        </mesh>
    );

    return sphereMesh;
}

function Earth() {
    const sphereMesh = (
        <mesh ref={node => objects.push(node)} position-x={20}>
            <MySphereGeometry />
            <meshPhongMaterial emissive={0x1244aa} />
        </mesh>
    );

    return sphereMesh;
}

function Animate() {
    useFrame(({ clock }) => {
        if (objects.length === 0) return null;

        const time = clock.getElapsedTime();
        objects.forEach(obj => {
            obj.rotation.y = time;
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
                    // camera.up.set(1, -10, -2);
                    camera.lookAt(0, 0, 0);
                }}
            >
                {/* <perspectiveCamera
                    fov={90}
                    position={[0, 1300, 0]}
                    up={[0, 0, 1]}
                    onUpdate={self => self.lookAt(10, 0, 0)}
                /> */}
                {/* <ambientLight /> */}
                <pointLight args={[0xffffff, 3]} position={[0, 0, 0]} />
                <Animate />
                <Sun />
                <Earth />
                <mesh position={[0, -10, 0]}>
                    <boxBufferGeometry args={[2, 2, 2]}></boxBufferGeometry>
                    <meshPhongMaterial />
                </mesh>
            </Canvas>
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById("root"));
