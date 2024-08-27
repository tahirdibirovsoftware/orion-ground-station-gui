/* eslint-disable react/prop-types */
import React, { useContext, useMemo } from 'react';
import { Timer } from '@renderer/entities/Timer';
import { getBatteryLevel } from '../lib/getBatteryLevel';
import style from './StatusBar.module.scss';
import BatteryGauge from 'react-battery-gauge';
import { IStatusBar } from '../model/types';
import { ThemeContext } from '@renderer/app/providers/ThemeProvider/ThemeProvider';
import { themeSetter } from '@renderer/shared/config/theme/model/themeSetter';


const batteryCustomization = {
  batteryBody: { strokeColor: '#4a4a4a', strokeWidth: 2, cornerRadius: 3 },
  batteryCap: { fill: '#4a4a4a', strokeWidth: 0 },
  batteryMeter: { fill: '#4CAF50' },
  readingText: { fontSize: 12, fill: '#ffffff' }
};

export const StatusBar: React.FC<IStatusBar> = React.memo(({ flightData }) => {
  const { theme } = useContext(ThemeContext);

  const { voltageLevel } = useMemo(() => {
    const lastData = flightData[flightData.length - 1] || {};
    return {
      voltageLevel: lastData.voltageLevel || 0,
      isActive: (lastData.packetNumber || 0) > 0
    };
  }, [flightData]);

  const localStyles = useMemo(() => ({...themeSetter(theme)}),[theme]);
  const batteryLevel = useMemo(() => getBatteryLevel(voltageLevel), [voltageLevel]);

  return (
    <div style={localStyles} className={style.StatusBar}>
      <div className={style.timerContainer}>
        <Timer flightData={flightData} size={100} />
      </div>
 
        <div className={style.batteryContainer}>
          <BatteryGauge
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