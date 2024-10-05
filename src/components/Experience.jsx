import {
  CameraControls,
  // ContactShadows,
  Environment,
  Text,
} from "@react-three/drei";
import { Suspense, useEffect, useRef, useState } from "react";
import { useChat } from "../hooks/useChat";
import { Avatar } from "./Avatar";
import { useLoader } from "@react-three/fiber";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader.js";
import PlanetsStack from "./planetsStack";

const Dots = (props) => {
  const { loading } = useChat();
  const [loadingText, setLoadingText] = useState("");
  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setLoadingText((loadingText) => {
          if (loadingText.length > 2) {
            return ".";
          }
          return loadingText + ".";
        });
      }, 800);
      return () => clearInterval(interval);
    } else {
      setLoadingText("");
    }
  }, [loading]);
  if (!loading) return null;
  return (
    <group {...props}>
      <Text fontSize={0.14} anchorX={"left"} anchorY={"bottom"}>
        {loadingText}
        <meshBasicMaterial attach="material" color="black" />
      </Text>
    </group>
  );
};
const STLModel = ({ url }) => {
  const geom = useLoader(STLLoader, url);
  const material = { color: 'gray', wireframe: false };

  return (
    <mesh geometry={geom} position={[0, 1, 0]} scale={[0.7, 0.7, 0.7]} rotation={[0, Math.PI / 1, 0]}>
      <meshStandardMaterial {...material} />
    </mesh>
  );
};
export const Experience = () => {
  const cameraControls = useRef();
  const { cameraZoomed } = useChat();

  useEffect(() => {
    cameraControls.current.setLookAt(0, 2, 5, 0, 1.5, 0);
  }, []);

  useEffect(() => {
    if (cameraZoomed) {
      cameraControls.current.setLookAt(0, 1.5, 15, 0, 1.5, 0, true);
    } else {
      cameraControls.current.setLookAt(0, 4.2, 7, 0, 1.0, 0, true);
    }
  }, [cameraZoomed]);
  return (
    <>
      <CameraControls ref={cameraControls} />
      <Environment preset="sunset" />
      {/* Wrapping Dots into Suspense to prevent Blink when Troika/Font is loaded */}
      <Suspense>
        <Dots position-y={1.75} position-x={-0.02} />
      </Suspense>

      {/* <PlanetsStack /> */}
      <Avatar position={[0, 3, 0]} />
      {/* <STLModel url="stls/Exo3_uncut_1.stl" /> */}

      {/* <ContactShadows opacity={0.7} /> */}
    </>
  );
};
