/* eslint-disable react/prop-types */
import React, { useContext, useMemo } from 'react';
import { Timer } from '@renderer/entities/Timer';
import { getBatteryLevel } from '../lib/getBatteryLevel';
import style from './StatusBar.module.scss';
import BatteryGauge from 'react-battery-gauge';
import { IStatusBar } from '../model/types';
import { ThemeContext } from '@renderer/app/providers/ThemeProvider/ThemeProvider';
import { themeSetter } from '@renderer/shared/config/theme/model/themeSetter';
import { ALL_BORDERS } from '@renderer/shared/config/theme/constants';




export const StatusBar: React.FC<IStatusBar> = React.memo(({ flightData }) => {
  const { theme } = useContext(ThemeContext);

  const batteryCustomization = {
    batteryBody: { strokeColor: '#111111', strokeWidth: 2, cornerRadius: 3 },
    batteryCap: { fill: '#000000', strokeWidth: 0 },
    batteryMeter: { fill: '#00ff00' },
    readingText: { fontSize: 12, fill: theme === 'dark' ? '#000000' : '#000000' }
  };

  const { voltageLevel } = useMemo(() => {
    const lastData = flightData[flightData.length - 1] || {};
    return {
      voltageLevel: lastData.voltageLevel || 0,
      isActive: (lastData.packetNumber || 0) > 0
    };
  }, [flightData]);

  const localStyles = useMemo(() => ({ ...themeSetter(theme, ALL_BORDERS, [0, 0, 10, 0]) }), [theme]);
  const batteryLevel = useMemo(() => getBatteryLevel(voltageLevel), [voltageLevel]);

  return (
    <div style={localStyles} className={style.StatusBar}>
      <div className={style.timerContainer}>
        <Timer flightData={flightData} size={100} />
      </div>

      <div className={style.batteryContainer}>
        <BatteryGauge
          animated
          customization={batteryCustomization}
          size={60}
          value={batteryLevel}
        />
      </div>

    </div>
  );
});

StatusBar.displayName = 'StatusBar';

export const MemoizedStatusBar = StatusBar;