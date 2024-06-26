import { FC } from 'react'
import style from './BaudRateConfig.module.scss'
import { IBaudRateConfig } from '../model/types'
import { useAppDispatch, useAppSelector } from '@renderer/app/redux/hooks'
import { setFlightBaudRate, setIoTBaudRate } from '../model/baudRateSlice'
import { Trans, useTranslation } from 'react-i18next'

const BaudRateConfig:FC<IBaudRateConfig> = ({type}): JSX.Element => {
    useTranslation();
    const baudRates = [300, 1200, 2400, 4800, 9600, 14400, 19200, 28800, 38400, 57600, 115200, 230400, 460800, 921600]
    const dispatch = useAppDispatch()
    const isFlightConnected = useAppSelector(state=>state.connectorReducer.flightConnect)==='connected';
    const isIotConnected = useAppSelector(state=>state.connectorReducer.iotConnect)==='connected';
    const flightBaudRate = useAppSelector(state=>state.baudRateReducer.flightBaudRate);
    const iotBaudRate = useAppSelector(state=>state.baudRateReducer.iotBaudRate);

    const isConnected = ():boolean => {
        if(type==='flight') return isFlightConnected;
        if(type==='iot') return isIotConnected;
        return false;
    }

    const baudRateHandler = (event: React.ChangeEvent<HTMLSelectElement>):void=>{
        if(type==='flight')
            dispatch(setFlightBaudRate(Number(event.target.value)))
        
        if(type==='iot')
            dispatch(setIoTBaudRate(Number(event.target.value)))
    }

    const getBaudRate = ():number=>{
       return type==='flight' ? flightBaudRate : iotBaudRate
    }

    return (
        <div className={style.BaudRate}>

            <span><Trans>BAUDRATE</Trans>: </span>
            <select disabled={isConnected()} onChange={baudRateHandler} defaultValue={getBaudRate() || baudRates[9]}>
                {
                    baudRates.map(baudRate => <option key={baudRate} value={baudRate}>{baudRate}</option>)
                }
            </select>

        </div>
    )
}

export { BaudRateConfig }