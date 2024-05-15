import { FC } from 'react';
import style from './Connector.module.scss';
import { IConnector } from '../model/types';
import { Button } from 'antd';
import { useAppDispatch, useAppSelector } from '@renderer/app/redux/hooks';
import { connectToFlight, connectToIoT } from '../model/connectorSlice';


const Connector: FC<IConnector> = ({ type }): JSX.Element => {

    const dispatch = useAppDispatch()
    const isConnected = useAppSelector(state => type === 'flight' ? state.connectorReducer.flightConnect : state.connectorReducer.iotConnect) === 'connected'

    const connectHandler = (): void => {
        if (type === 'flight') {
            //Connection Logic
            dispatch(connectToFlight('connected'))
        }
        else if (type === 'iot') {
            //Connection Logic
            dispatch(connectToIoT('connected'))
        }
    }

    const disconnectHandler = (): void => {
        if (type === 'flight') {
            //Discnnection Logic
            dispatch(connectToFlight('disconnected'))
        }
        else if (type === 'iot') {
            //Disconnection Logic
            dispatch(connectToIoT('disconnected'))
        }
    }

    return (
        <div className={style.Connector}>
            {
                !isConnected ? <Button onClick={connectHandler} size='small' type='text' className={style.ButtonConnect}>{'Connect'.toUpperCase()}</Button> :
                    <Button onClick={disconnectHandler} size='small' type='text' className={style.ButtonDisconnect}>{'Disconnect'.toUpperCase()}</Button>
            }
        </div>
    )
}

export { Connector }