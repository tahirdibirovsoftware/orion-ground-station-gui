import { Terminal } from '../../../widgets/Terminal';
import { Visualizer } from '../../../widgets/Visualizer';
import style from './FlightMode.module.scss';

const FlightMode = ():JSX.Element => {
    return(
        <div className={style.FlightMode}>
            <Visualizer/>
            <Terminal mode='demo'/>
        </div>
    )
}

export {FlightMode}