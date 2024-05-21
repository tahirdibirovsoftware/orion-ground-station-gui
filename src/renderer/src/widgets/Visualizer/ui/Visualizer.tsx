import { ParentLineChart } from '@renderer/entities/LineChart';
import style from './Visualizer.module.scss';
import { FC, useState, useEffect } from 'react';
import { IVisualizer } from '../model/types';
import { Map } from '@renderer/entities/Map';
import { Cam } from '@renderer/entities/Cam/ui/Cam';
import { ObjectTracker } from '@renderer/entities/ObjectTracker';

const Visualizer: FC<IVisualizer> = ({ flightData }): JSX.Element => {
  const mainPressureData = flightData.map((data) => data?.pressure1);
  const optionalPressureData = flightData.map((data) => data?.pressure2);
  const mainAltitudeData = flightData.map((data) => data.altitude1);
  const optionalAltitudeData = flightData.map((data) => data.altitude2);
  const iotTemp = flightData.map((data) => data.iotData) as Array<number>;
  const temperature = flightData.map((data) => data.temp);
  const pitch = flightData[flightData.length-1].pitch;
  const yaw = flightData[flightData.length-1].YAW;
  const roll = flightData[flightData.length-1].roll;

  const [currentPosition, setCurrentPosition] = useState<[number, number]>([40, 60]);

  useEffect(() => {
    const latestFlightData = flightData[flightData.length - 1];
    setCurrentPosition([+latestFlightData.gps1Latitude || 0, +latestFlightData.gps1Longitude || 0]);
  }, [flightData]);

  return (
    <div className={style.Visualizer}>
      <ParentLineChart
        mainLabelTitle='Pressure 1'
        optionalLabelTitle='Pressure 2'
        mainData={mainPressureData}
        optionalData={optionalPressureData}
        title='Pressure vs Time'
        mainXTitle='Time (s)'
        mainYTitle='Pressure (Pa)'
      />
      <ParentLineChart
        mainLabelTitle='Altitude 1'
        optionalLabelTitle='Altitude 2'
        mainData={mainAltitudeData}
        optionalData={optionalAltitudeData}
        title='Altitude vs Time'
        mainXTitle='Time (s)'
        mainYTitle='Altitude (m)'
      />
      <ParentLineChart
        mainLabelTitle='Temperature'
        optionalLabelTitle='IoT Temperature'
        mainData={temperature}
        optionalData={iotTemp}
        title='Temperature, IoT Temperature vs Time'
        mainXTitle='Time'
        mainYTitle='Temperature (&deg;C)'
        optionalYTitle='IoT Temperature (&deg;C)'
      />
      <Map getGpsData={() => currentPosition} initialPosition={[33, 33]} />
      <ObjectTracker pitch={pitch} yaw={yaw} roll={roll}/>
      <Cam/>
    </div>
  );
};

export { Visualizer };
