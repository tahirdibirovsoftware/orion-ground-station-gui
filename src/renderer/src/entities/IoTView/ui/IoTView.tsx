import React, { useContext, useMemo } from 'react';
import style from './IoTView.module.scss';
import { ThemeContext } from '../../../app/providers/ThemeProvider/ThemeProvider';
import { themeSetter } from '../../../shared/config/theme/model/themeSetter';
import { IIOTView } from '../model/types';

export const IoTView: React.FC<IIOTView> = ({ iotData }) => {
  const { theme } = useContext(ThemeContext);

  const { temperature, humidity, dataAvailable } = useMemo(() => {
    const lastData = iotData[iotData.length - 1] || {};
    return {
      temperature: lastData.temperature,
      humidity: lastData.humidity,
      dataAvailable: Boolean(lastData.temperature && lastData.humidity)
    };
  }, [iotData]);

  const localStyles = useMemo(() => themeSetter(theme), [theme]);

  return (
    <div style={localStyles} className={style.IoTView}>
      {dataAvailable && (
        <>
          <span>{temperature} &deg;C</span>
          <span>|</span>
          <span>{humidity}%</span>
        </>
      )}
    </div>
  );
};

export const MemoizedIoTView = React.memo(IoTView);