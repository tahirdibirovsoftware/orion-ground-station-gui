/* eslint-disable react/no-unknown-property */
import { useState, useRef, useEffect, useContext, Suspense } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import * as THREE from 'three';
import style from './OtWithCallib.module.scss';
import { ThemeContext } from '@renderer/app/providers/ThemeProvider/ThemeProvider';
import { themeSetter } from '@renderer/shared/config/theme/themeSetter';
import { useAppSelector } from '@renderer/app/redux/hooks';

// Import rocketPath for production mode
import rocketPathFromModule from './STL/rocket.obj';
import { Trans, useTranslation } from 'react-i18next';

interface ObjectTrackerProps {
  pitch: number;
  yaw: number;
  roll: number;
}

const OtWithCallib = ({ pitch, yaw, roll }: ObjectTrackerProps): JSX.Element => {
  useTranslation()
  const { theme } = useContext(ThemeContext);
  const ref = useRef<THREE.Group>(null);
  const object = useLoader(OBJLoader, rocketPathFromModule) as THREE.Group;

  // State for calibration offsets
  const [calibration, setCalibration] = useState({ pitch: 0, yaw: 0, roll: 0 });

  // Function to handle calibration
  const handleCalibrate = (): void => {
    setCalibration({ pitch, yaw, roll });
  };

  useEffect(() => {
    if (ref.current) {
      ref.current.rotation.x = THREE.MathUtils.degToRad(pitch - calibration.pitch);
      ref.current.rotation.y = THREE.MathUtils.degToRad(yaw - calibration.yaw);
      ref.current.rotation.z = THREE.MathUtils.degToRad(roll - calibration.roll);
    }
  }, [pitch, yaw, roll, calibration]);

  const localStyles: React.CSSProperties = {
    ...themeSetter(theme),
  };

  const flightData = useAppSelector((state) => state.flightDataStoreReducer);
  const isActive = flightData[flightData.length - 1].packetNumber > 0;

  return (
    <div style={localStyles} className={style.OtWithCallib}>
      {isActive && (
        <div className={style.objectContainer}>
          <div className={style.canvasContainer}>
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
          </div>
        </div>
      )}
    {
        isActive && 
        <div style={localStyles} className={style.callibrationContainer}>
    <button style={localStyles} onClick={handleCalibrate}><Trans>CALIBRATE</Trans></button>
    </div>
    }
    </div>
  );
};

export { OtWithCallib };
