import { Timer } from '@renderer/entities/Timer';
import { getBatteryLevel } from '../lib/getBatteryLevel';
import style from './StatusBar.module.scss'
import BatteryGauge from 'react-battery-gauge';
import React, { FC, useContext } from 'react';
import { IStatusBar } from '../model/types';
import { ThemeContext } from '@renderer/app/providers/ThemeProvider/ThemeProvider';
import { themeSetter } from '@renderer/shared/config/theme/themeSetter';

const StatusBar:FC<IStatusBar> = ({flightData}):JSX.Element =>{
    
    const voltageLevel = flightData[flightData.length-1].packetNumber>0 && flightData[flightData.length-1].voltageLevel || 0
    const {theme} = useContext(ThemeContext)

    const localeStyles: React.CSSProperties = {
        ...themeSetter(theme)
    }

    return(
        <div style={localeStyles} className={style.StatusBar}>
            <Timer flightData={flightData} size={100}/>
            <BatteryGauge customization={{batteryBody:{strokeColor: 'gray', strokeWidth:1}, batteryCap: {fill: 'gray', strokeWidth:1}}} size={50} value={getBatteryLevel(voltageLevel)}/>
        </div>
    )
}

export {StatusBar}