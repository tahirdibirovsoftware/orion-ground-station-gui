/* eslint-disable react/prop-types */
import React, { useContext, useMemo } from 'react';
import style from './Timer.module.scss';
import { ITimer } from '../model/types';
import { ThemeContext } from '@renderer/app/providers/ThemeProvider/ThemeProvider';
import { themeSetter } from '@renderer/shared/config/theme/model/themeSetter';

export const Timer: React.FC<ITimer> = React.memo(({ flightData }) => {
  const { theme } = useContext(ThemeContext);

  const { hours, minutes, seconds } = useMemo(() => {
    const lastData = flightData[flightData.length - 1] || {};
    const gpsDate = lastData.missionTime;
    
    if (typeof gpsDate !== 'string') {
      return { hours: '00', minutes: '00', seconds: '00' };
    }

    const gpsArrayDate = gpsDate.split('/');
    if (gpsArrayDate.length < 6) {
      return { hours: '00', minutes: '00', seconds: '00' };
    }

    const padZero = (num: string): string => num.padStart(2, '0');

    return {
      hours: padZero(gpsArrayDate[3]),
      minutes: padZero(gpsArrayDate[4]),
      seconds: padZero(gpsArrayDate[5])
    };
  }, [flightData]);

  const localStyles = useMemo(() => ({
    color: 'rgba(200,200,200,1)',
    ...themeSetter(theme || 'light')
  }), [theme]);

  return (
    <div style={localStyles} className={style.Timer}>
      <span>{hours}:</span>
      <span>{minutes}:</span>
      <span>{seconds}</span>
    </div>
  );
});

Timer.displayName = 'Timer';