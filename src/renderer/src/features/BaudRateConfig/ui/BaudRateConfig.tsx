import { FC } from 'react'
import style from './BaudRateConfig.module.scss'
import { IBaudRateConfig } from '../model/types'

const BaudRateConfig:FC<IBaudRateConfig> = ({type}): JSX.Element => {

    const baudRates = [300, 1200, 2400, 4800, 9600, 14400, 19200, 28800, 38400, 57600, 115200, 230400, 460800, 921600]

    return (
        <div className={style.BaudRate}>

            <span>BaudRate: </span>
            <select>
                {
                    baudRates.map(baudRate => <option value={baudRate}>{baudRate}</option>)
                }
            </select>

        </div>
    )
}

export { BaudRateConfig }