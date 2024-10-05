import { useState, useRef, Suspense, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Preload } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";

const Stars = (props) => {
  const ref = useRef();
  const [sphere, setSphere] = useState(new Float32Array(7000));

  useEffect(() => {
    const generatedSphere = random.inSphere(new Float32Array(7000), { radius: 1.2 });

    // Check if the array contains any NaN values and replace them if necessary
    const isValid = generatedSphere.every((val) => !isNaN(val));

    if (isValid) {
      setSphere(generatedSphere);
    } else {
      console.error("Sphere contains invalid values");
    }
  }, []);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled {...props}>
        <PointMaterial
          transparent
          color="#f272c8"
          size={props.starSize || 0.002}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

const StarsOverlay = ({ children, starSize }) => {
  return (
    <div className="h-auto relative">
      <div className="w-full absolute inset-0 z-[1]">
        <Canvas camera={{ position: [0, 0, 1] }}>
          <Suspense fallback={null}>
            <Stars starSize={starSize} />
          </Suspense>

          <Preload all />
        </Canvas>
      </div>

      <div className="">{children}</div>
    </div>
  );
};

export default StarsOverlay;
