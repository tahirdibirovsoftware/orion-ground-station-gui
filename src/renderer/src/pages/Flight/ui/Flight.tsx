import {Chart} from '@renderer/entities/Chart/ui/Chart'
import style from './Flight.module.scss'

const Flight = ():JSX.Element => {
    return(
        <div className={style.Flight}>
            <Chart/>
            <Chart/>
            <Chart/>
            <Chart/>
            <Chart/>
            <Chart/>
            <Chart/>
            <Chart/>
        </div>
    )
}


export {Flight} 