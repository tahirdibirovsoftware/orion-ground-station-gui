/* eslint-disable react/no-unknown-property */
import { useRef, useEffect, useContext, Suspense } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import * as THREE from 'three';
import style from './ObjectTracker.module.scss';
import { ThemeContext } from '@renderer/app/providers/ThemeProvider/ThemeProvider';
import { themeSetter } from '@renderer/shared/config/theme/themeSetter';
import { useAppSelector } from '@renderer/app/redux/hooks';
import rocketPath from './STL/rocket.obj';



interface ObjectTrackerProps {
  pitch: number;
  yaw: number;
  roll: number;
}

const ObjectTracker = ({ pitch, yaw, roll }: ObjectTrackerProps): JSX.Element => {
  const { theme } = useContext(ThemeContext);
  const ref = useRef<THREE.Group>(null);
  const object = useLoader(OBJLoader, rocketPath) as THREE.Group;

  useEffect(() => {
    if (ref.current) {
      ref.current.rotation.x = THREE.MathUtils.degToRad(pitch);
      ref.current.rotation.y = THREE.MathUtils.degToRad(yaw);
      ref.current.rotation.z = THREE.MathUtils.degToRad(roll);
    }
  }, [pitch, yaw, roll]);

  const localStyles: React.CSSProperties = {
    ...themeSetter(theme),
  };
  
  const flightData = useAppSelector(state => state.flightDataStoreReducer);
  const isActive = flightData[flightData.length - 1].packetNumber > 0;

  return (
    <div style={localStyles} className={style.ObjectTracker}>
      {isActive && (
        <Canvas>
          <ambientLight color={0x404040} intensity={0.5} />
          <pointLight color={0xff0000} position={[10, 10, 10]} intensity={1} />
          <directionalLight color={0x0000ff} position={[-10, -10, -10]} intensity={0.5} />
          <Suspense fallback={null}>
            <group ref={ref} scale={[0.009, 0.009, 0.009]} position={[0, 2, 0]}>
              <primitive object={object} />
            </group>
          </Suspense>
          <OrbitControls />
        </Canvas>
      )}
    </div>
  );
};

export { ObjectTracker };
