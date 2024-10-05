import { useTexture } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";

const Planet = ({ objUrl, textureUrl, position }) => {
    // Load the OBJ model
    const obj = useLoader(OBJLoader, objUrl);
    // Load the texture for the planet
    const texture = useTexture(textureUrl);

    return (
        <mesh geometry={obj.children[0].geometry} position={position} scale={[0.3, 0.3, 0.3]}>
            {/* Apply the texture */}
            <meshStandardMaterial map={texture} />
        </mesh>
    );
};
export default Planet;