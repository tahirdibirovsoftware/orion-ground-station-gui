import { Timer } from '@renderer/entities/Timer';
import { getBatteryLevel } from '../lib/getBatteryLevel';
import style from './StatusBar.module.scss'
import BatteryGauge from 'react-battery-gauge';
import { FC } from 'react';
import { IStatusBar } from '../model/types';

const StatusBar:FC<IStatusBar> = ({flightData}):JSX.Element =>{
    
    const voltageLevel = flightData[flightData.length-1].packetNumber>0 && flightData[flightData.length-1].voltageLevel || 0

    return(
        <div className={style.StatusBar}>
            <Timer flightData={flightData} size={3.3}/>
            <BatteryGauge customization={{batteryBody:{strokeColor: 'gray', strokeWidth:1}, batteryCap: {fill: 'gray', strokeWidth:1}}} size={55} value={getBatteryLevel(voltageLevel,10)}/>
        </div>
    )
}

export {StatusBar}