import { FC } from 'react';
import { Terminal } from '../../../widgets/Terminal';
import { Visualizer } from '../../../widgets/Visualizer';
import style from './FlightMode.module.scss';
import { IFlight } from '../model/types';

const FlightMode:FC<IFlight> = ({flightData}):JSX.Element => {
  
    return(
        <div className={style.FlightMode}>
            <Visualizer flightData={flightData}/>
            <Terminal flightData={flightData} mode='demo'/>
        </div>
    )
}

export {FlightMode}