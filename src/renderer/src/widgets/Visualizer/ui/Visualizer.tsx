import { ParentLineChart } from '@renderer/entities/LineChart';
import style from './Visualizer.module.scss';
import { FC, useState, useEffect } from 'react';
import { IVisualizer } from '../model/types';
import { Map } from '@renderer/entities/Map';
import { Cam } from '@renderer/entities/Cam/ui/Cam';
import { useTranslation } from 'react-i18next';
import { MemoizedOtWithCallib } from '@renderer/entities/OtWithCallib/ui/OtWithCallib';

const Visualizer: FC<IVisualizer> = ({ flightData }): JSX.Element => {
  const mainPressureData = flightData.map((data) => data?.pressure1);
  const optionalPressureData = flightData.map((data) => data?.pressure2);
  const mainAltitudeData = flightData.map((data) => data.altitude1);
  const optionalAltitudeData = flightData.map((data) => data.altitude2);
  const iotTemp = flightData.map((data) => data.iotData) as Array<number>;
  const temperature = flightData.map((data) => data.temp);
  const descentRate = flightData.map((data) => data.descentRate);
  const batteryVoltage = flightData.map((data) => data.voltageLevel);
  const { t } = useTranslation();

  const [currentPosition, setCurrentPosition] = useState<[number, number]>([40, 60]);

  useEffect(() => {
    const latestFlightData = flightData[flightData.length - 1];
    setCurrentPosition([+latestFlightData.gps1Latitude || 0, +latestFlightData.gps1Longitude || 0]);
  }, [flightData]);

  return (
    <div className={style.Visualizer}>
      <ParentLineChart
        mainLabelTitle={t('PRESSURE1')}
        optionalLabelTitle={t('PRESSURE2')}
        mainData={mainPressureData}
        optionalData={optionalPressureData}
        title={`${t('PRESSURE')} vs ${t('TIME')}`}
        mainXTitle={t('TIME')}
        mainYTitle={t('PRESSURE')}
      />
      <ParentLineChart
        mainLabelTitle={t('ALTITUDE1')}
        optionalLabelTitle={t('ALTITUDE2')}
        mainData={mainAltitudeData}
        optionalData={optionalAltitudeData}
        title={`${t('ALTITUDE')} vs ${t('TIME')}`}
        mainXTitle={t('TIME')}
        mainYTitle={`${t('ALTITUDE')}/${t('DESCENT_RATE')}`}
        additionalData1={descentRate}
        additionalLabel1Title={`${t('DESCENT_RATE')}`}
      />
      <ParentLineChart
        mainLabelTitle={t('TEMPERATURE')}
        optionalLabelTitle={`IoT ${t('TEMPERATURE')}`}
        mainData={temperature}
        optionalData={iotTemp}
        title={`${t('TEMPERATURE')}, IoT ${t('TEMPERATURE')} vs ${t('TIME')}`}
        mainXTitle={t('TIME')}
        mainYTitle={`${t('TEMPERATURE')}/${t('BATTERY_VOLTAGE')}`}
        optionalYTitle=''
        additionalData2={batteryVoltage}
        additionalLabel2Title={t('BATTERY_VOLTAGE')}
      />
      <Map getGpsData={() => currentPosition} />
      <MemoizedOtWithCallib />
      <Cam />
    </div>
  );
};

export { Visualizer };