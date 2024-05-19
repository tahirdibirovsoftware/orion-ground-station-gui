import { ParentLineChart } from '@renderer/entities/LineChart';
import style from './Visualizer.module.scss';
import { ParentBarChart } from '@renderer/entities/BarChart';
import { FC } from 'react';
import { IVisualizer } from '../model/types';


const Visualizer:FC<IVisualizer> = ({data}):JSX.Element => {

    const mainPressureData = data.map(data=>data?.pressure1)
    const optionalPressureData = data.map(data=>data?.pressure2)
    const mainAltitudeData = data.map(data=>data.altitude1)
    const optionalAltitudeData = data.map(data=>data.altitude2)
    const descentRate = data.map(data=>data.descentRate)
    const temperature = data.map(data=>data.temp)
    console.log('2', optionalAltitudeData)

    return(
        <div className={style.Visualizer}>
            <ParentLineChart mainLabelTitle='Pressure 1' optionalLabelTitle='Pressure 2' mainData={mainPressureData} optionalData={optionalPressureData} title='Pressure vs Time' mainXTitle='Time (s)' mainYTitle='Pressure (Pa)'/>
            <ParentBarChart mainLabelTitle='Altitude 1' optionalLabelTitle='Altitude 2' mainData={mainAltitudeData} optionalData={optionalAltitudeData} title='Altitude vs Time' mainXTitle='Time (s)' mainYTitle='Altitude (m)'/>
           <ParentLineChart mainLabelTitle='Temperature' optionalLabelTitle='Descent Rate' mainData={temperature} optionalData={descentRate}  title='Temperature/Descent Rate vs Time' mainXTitle='Time' mainYTitle='Temperature (&deg;C)' optionalYTitle='Descent Rate (m/s)'/>
        </div>
    )
} 


export {Visualizer}