import ReactDOM from "react-dom";
import { Canvas } from "@react-three/fiber";
import "./index.css";

function App() {
    return (
        <div id="canvas-container">
            <Canvas camera={{ fov: 90, position: [0, 1, 4] }}>
                <ambientLight />
                <mesh>
                    <boxBufferGeometry />
                    <meshStandardMaterial color="blue" />
                </mesh>
            </Canvas>
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById("root"));
