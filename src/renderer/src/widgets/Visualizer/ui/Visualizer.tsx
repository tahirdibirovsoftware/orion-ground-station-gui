import { ParentLineChart } from '@renderer/entities/LineChart';
import style from './Visualizer.module.scss';


const Visualizer = ():JSX.Element => {
    return(
        <div className={style.Visualizer}>
            <ParentLineChart/>
        </div>
    )
} 


export {Visualizer}