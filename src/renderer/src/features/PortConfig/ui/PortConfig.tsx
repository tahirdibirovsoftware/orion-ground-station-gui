import { FC } from 'react'
import style from './PortConfig.module.scss'
import { IPortConfig } from '../model/types'

const PortConfig:FC<IPortConfig> = ({type}):JSX.Element => {

    const ports = ["/dev/ttyS0", "/dev/ttyS1", "/dev/ttyUSB0", "/dev/ttyAMA0"]

    return(
        <div className={style.Port}>
                <span>PORT: </span>
                 <select>
                 {
                    ports.map(port=><option value={port}>{port}</option>)
                }
                 </select>
        </div>
    )
}

export { PortConfig }