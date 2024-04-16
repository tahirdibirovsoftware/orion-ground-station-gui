import {Chart} from '@renderer/entities/Chart/ui/Chart'
import style from './Flight.module.scss'

const Flight = ():JSX.Element => {
    return(
        <div className={style.Flight}>
            <Chart type='temperature'/>
            <Chart type='pressure'/>
            <Chart type='voltage'/>
            <Chart type='altitude'/>
            <Chart type='axes'/>
            <Chart type='descentRate'/>
            <Chart type='position'/>
            <Chart/>
        </div>
    )
}


export {Flight} 