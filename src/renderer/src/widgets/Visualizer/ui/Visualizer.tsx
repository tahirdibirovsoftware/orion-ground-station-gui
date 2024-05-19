import { ParentLineChart } from '@renderer/entities/LineChart';
import style from './Visualizer.module.scss';
import { BarChart } from '@renderer/entities/BarChart';
import { FC } from 'react';
import { IVisualizer } from '../model/types';


const Visualizer:FC<IVisualizer> = ({data}):JSX.Element => {

    const mainPressureData = data.map(data=>data?.pressure1)
    const optionalPressureData = data.map(data=>data?.pressure2)

    return(
        <div className={style.Visualizer}>
            <ParentLineChart mainData={mainPressureData} optionalData={optionalPressureData} title='Pressure vs Time' mainXTitle='Time (s)' mainYTitle='Pressure (Pa)'/>
            <BarChart/>
           
        </div>
    )
} 


export {Visualizer}