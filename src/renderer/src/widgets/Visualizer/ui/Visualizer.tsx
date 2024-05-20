import { ParentLineChart } from '@renderer/entities/LineChart';
import style from './Visualizer.module.scss';
import { ParentBarChart } from '@renderer/entities/BarChart';
import { FC, useState, useEffect } from 'react';
import { IVisualizer } from '../model/types';
import { Map } from '@renderer/entities/Map';
import { Cam } from '@renderer/entities/Cam/ui/Cam';
import { ObjectTracker } from '@renderer/entities/ObjectTracker';

const Visualizer: FC<IVisualizer> = ({ data }): JSX.Element => {
  const mainPressureData = data.map((data) => data?.pressure1);
  const optionalPressureData = data.map((data) => data?.pressure2);
  const mainAltitudeData = data.map((data) => data.altitude1);
  const optionalAltitudeData = data.map((data) => data.altitude2);
  const descentRate = data.map((data) => data.descentRate);
  const temperature = data.map((data) => data.temp);

  const [currentPosition, setCurrentPosition] = useState<[number, number]>([40, 60]);

  useEffect(() => {
    const latestData = data[data.length - 1];
    setCurrentPosition([+latestData.gps1Latitude || 0, +latestData.gps1Longitude || 0]);
  }, [data]);

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
      <ParentBarChart
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
        optionalLabelTitle='Descent Rate'
        mainData={temperature}
        optionalData={descentRate}
        title='Temperature/Descent Rate vs Time'
        mainXTitle='Time'
        mainYTitle='Temperature (&deg;C)'
        optionalYTitle='Descent Rate (m/s)'
      />
      <Map getGpsData={() => currentPosition} initialPosition={[33, 33]} />
      <ObjectTracker/>
      <Cam/>
    </div>
  );
};

export { Visualizer };
