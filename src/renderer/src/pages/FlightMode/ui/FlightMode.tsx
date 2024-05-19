import { FC } from 'react';
import { Terminal } from '../../../widgets/Terminal';
import { Visualizer } from '../../../widgets/Visualizer';
import style from './FlightMode.module.scss';
import { IFlight } from '../model/types';

const FlightMode:FC<IFlight> = ({data}):JSX.Element => {
  
    return(
        <div className={style.FlightMode}>
            <Visualizer data={data}/>
            <Terminal data={data} mode='demo'/>
        </div>
    )
}

export {FlightMode}