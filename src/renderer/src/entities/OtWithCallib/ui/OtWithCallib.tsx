/* eslint-disable react/no-unknown-property */
import React, { useState, useRef, useContext, Suspense, useMemo } from 'react';
import { Canvas, useLoader, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import * as THREE from 'three';
import { ThemeContext } from '@renderer/app/providers/ThemeProvider/ThemeProvider';
import { themeSetter } from '@renderer/shared/config/theme/model/themeSetter';
import { useAppSelector } from '@renderer/app/redux/hooks';
import { Trans, useTranslation } from 'react-i18next';
import rocketPathFromModule from './STL/rocket.obj';
import styles from './OtWithCallib.module.scss';

interface Calibration {
  pitch: number;
  yaw: number;
  roll: number;
}

const RocketModel: React.FC<{ calibration: Calibration }> = ({ calibration }) => {
  const object = useLoader(OBJLoader, rocketPathFromModule);
  const ref = useRef<THREE.Group>(null);
  const flightData = useAppSelector((state) => state.flightDataStoreReducer[state.flightDataStoreReducer.length - 1]);

  useFrame(() => {
    if (ref.current && flightData) {
      ref.current.rotation.x = THREE.MathUtils.degToRad(flightData.pitch - calibration.pitch);
      ref.current.rotation.y = THREE.MathUtils.degToRad(flightData.YAW - calibration.yaw);
      ref.current.rotation.z = THREE.MathUtils.degToRad(flightData.roll - calibration.roll);
    }
  });

  return (
    <group ref={ref} scale={[0.009, 0.009, 0.009]} position={[0, 2, 0]}>
      <primitive object={object} />
    </group>
  );
};

const OtWithCallib: React.FC = () => {
  const { t } = useTranslation();
  const { theme } = useContext(ThemeContext);
  const [calibration, setCalibration] = useState<Calibration>({ pitch: 0, yaw: 0, roll: 0 });

  const flightData = useAppSelector((state) => state.flightDataStoreReducer);
  const isActive = useMemo(() => flightData[flightData.length - 1]?.packetNumber > 0, [flightData]);

  const handleCalibrate = (): void => {
    const lastFlightData = flightData[flightData.length - 1];
    if (lastFlightData) {
      setCalibration({
        pitch: lastFlightData.pitch,
        yaw: lastFlightData.YAW,
        roll: lastFlightData.roll
      });
    }
  };

  const localStyles = useMemo(() => themeSetter(theme), [theme]);

  return (
    <div style={localStyles} className={styles.OtWithCallib}>
      {isActive && (
        <>
          <div className={styles.objectContainer}>
            <div className={styles.canvasContainer}>
              <Canvas>
                <ambientLight color={0x404040} intensity={0.5} />
                <pointLight color={0xff0000} position={[10, 10, 10]} intensity={1} />
                <directionalLight color={0x0000ff} position={[-10, -10, -10]} intensity={0.5} />
                <Suspense fallback={<LoadingFallback />}>
                  <RocketModel calibration={calibration} />
                </Suspense>
                <OrbitControls />
              </Canvas>
            </div>
          </div>
          <div className={styles.callibrationContainer}>
            <button onClick={handleCalibrate}>
              <Trans>{t('CALIBRATE')}</Trans>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

const LoadingFallback: React.FC = () => (
  <mesh>
    <boxGeometry args={[1, 1, 1]} />
    <meshStandardMaterial color="gray" />
  </mesh>
);

export { OtWithCallib };