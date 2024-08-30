import { FC, useMemo, useCallback, useContext } from 'react'
import style from './BaudRateConfig.module.scss'
import { IBaudRateConfig } from '../model/types'
import { useAppDispatch, useAppSelector } from '@renderer/app/redux/hooks'
import { setFlightBaudRate, setIoTBaudRate } from '../model/baudRateSlice'
import { Trans, useTranslation } from 'react-i18next'
import { ThemeContext } from '@renderer/app/providers/ThemeProvider/ThemeProvider'
import { themeSetter } from '@renderer/shared/config/theme/model/themeSetter'

const baudRates = [300, 1200, 2400, 4800, 9600, 14400, 19200, 28800, 38400, 57600, 115200, 230400, 460800, 921600]

const BaudRateConfig: FC<IBaudRateConfig> = ({ type }): JSX.Element => {
    useTranslation();
    const { theme } = useContext(ThemeContext)
    const dispatch = useAppDispatch()

    const isConnected = useAppSelector(state => 
        type === 'flight' ? state.connectorReducer.flightConnect === 'connected' : state.connectorReducer.iotConnect === 'connected'
    );

    const baudRate = useAppSelector(state => 
        type === 'flight' ? state.baudRateReducer.flightBaudRate : state.baudRateReducer.iotBaudRate
    );

    const baudRateHandler = useCallback((event: React.ChangeEvent<HTMLSelectElement>): void => {
        const action = type === 'flight' ? setFlightBaudRate : setIoTBaudRate;
        dispatch(action(Number(event.target.value)))
    }, [dispatch, type]);

    const options = useMemo(() => baudRates.map(rate => (
        <option key={rate} value={rate}>{rate}</option>
    )), []);

    return (
        <div className={style.BaudRate}>
            <span><Trans>BAUDRATE</Trans>: </span>
            <select style={themeSetter(theme)} disabled={isConnected} onChange={baudRateHandler} defaultValue={baudRate || baudRates[9]}>
                {options}
            </select>
        </div>
    )
}

export { BaudRateConfig }