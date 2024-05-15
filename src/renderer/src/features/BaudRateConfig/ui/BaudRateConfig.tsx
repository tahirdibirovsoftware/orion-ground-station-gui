import { FC } from 'react'
import style from './BaudRateConfig.module.scss'
import { IBaudRateConfig } from '../model/types'
import { useAppDispatch } from '@renderer/app/redux/hooks'
import { setFlightBaudRate, setIoTBaudRate } from '../model/baudRateSlice'

const BaudRateConfig:FC<IBaudRateConfig> = ({type}): JSX.Element => {

    const baudRates = [300, 1200, 2400, 4800, 9600, 14400, 19200, 28800, 38400, 57600, 115200, 230400, 460800, 921600]
    const dispatch = useAppDispatch()


    const baudRateHandler = (event: React.ChangeEvent<HTMLSelectElement>):void=>{
        if(type==='flight')
            dispatch(setFlightBaudRate(Number(event.target.value)))
        
        if(type==='iot')
            dispatch(setIoTBaudRate(Number(event.target.value)))
    }


    return (
        <div className={style.BaudRate}>

            <span>BaudRate: </span>
            <select onChange={baudRateHandler} defaultValue={baudRates[9]}>
                {
                    baudRates.map(baudRate => <option key={baudRate} value={baudRate}>{baudRate}</option>)
                }
            </select>

        </div>
    )
}

export { BaudRateConfig }