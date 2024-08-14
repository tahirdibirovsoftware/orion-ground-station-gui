import React, { useContext, useMemo } from 'react';
import { Timer } from '@renderer/entities/Timer';
import { getBatteryLevel } from '../lib/getBatteryLevel';
import style from './StatusBar.module.scss';
import BatteryGauge from 'react-battery-gauge';
import { IStatusBar } from '../model/types';
import { ThemeContext } from '@renderer/app/providers/ThemeProvider/ThemeProvider';
import { themeSetter } from '@renderer/shared/config/theme/model/themeSetter';

export const StatusBar: React.FC<IStatusBar> = ({ flightData }) => {
  const { theme } = useContext(ThemeContext);

  const { voltageLevel, isActive } = useMemo(() => {
    const lastData = flightData[flightData.length - 1] || {};
    return {
      voltageLevel: lastData.voltageLevel || 0,
      isActive: (lastData.packetNumber || 0) > 0
    };
  }, [flightData]);

  const localStyles = useMemo(() => themeSetter(theme), [theme]);

  const batteryLevel = useMemo(() => getBatteryLevel(voltageLevel), [voltageLevel]);

  const batteryCustomization = useMemo(() => ({
    batteryBody: { strokeColor: 'gray', strokeWidth: 1 },
    batteryCap: { fill: 'gray', strokeWidth: 1 }
  }), []);

  return (
    <div style={localStyles} className={style.StatusBar}>
      <Timer flightData={flightData} size={100} />
      {isActive && (
        <BatteryGauge 
          customization={batteryCustomization} 
          size={50} 
          value={batteryLevel} 
        />
      )}
    </div>
  );
};

export const MemoizedStatusBar = React.memo(StatusBar);