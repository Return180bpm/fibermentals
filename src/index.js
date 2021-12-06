import { useRef } from "react";
import ReactDOM from "react-dom";
import { Canvas, useFrame } from "@react-three/fiber";
import "./index.css";

const objects = [];

function Sphere() {
    const radius = 1;
    const widthSegments = 6;
    const heightSegments = 6;
    const meshRef = useRef(null);

    const sphereMesh = (
        <mesh ref={node => objects.push(node)} scale={[5, 5, 5]}>
            <sphereBufferGeometry
                args={[radius, widthSegments, heightSegments]}
            />
            <meshPhongMaterial emissive={0xffff00} />
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
            <Canvas camera={{ fov: 90, position: [0, 1, 25] }}>
                {/* <ambientLight /> */}
                <pointLight args={[0xffffff, 3]} position={[0, 0, 0]} />
                <Animate />
                <Sphere />
                <mesh position={[0, -10, 0]}>
                    <boxBufferGeometry args={[2, 2, 2]}></boxBufferGeometry>
                    <meshPhongMaterial />
                </mesh>
            </Canvas>
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById("root"));
