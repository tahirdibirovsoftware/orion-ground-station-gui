import { FC, useState } from 'react';
import style from './Connector.module.scss';
import { IConnector } from '../model/types';
import { Button } from 'antd';

type ConnectionStatus = 'connected' | 'disconnected'

const Connector:FC<IConnector> = ({type}):JSX.Element => {

    const [isConnected, setIsConnected] = useState(false)

    const connectionAdapter = (status: ConnectionStatus):void=>{
        if(type==='flight'){}
        if(type==='iot'){}
    }

    const connectHandler = ():void => {
        connectionAdapter('connected')
        setIsConnected(true)
    }

    const disconnectHandler = ():void => {
        connectionAdapter('disconnected')
        setIsConnected(false)
    }

    return(
        <div className={style.Connector}>
            {
                !isConnected ? <Button onClick={connectHandler} size='small' type='text' className={style.ButtonConnect}>{'Connect'.toUpperCase()}</Button> :
                <Button onClick={disconnectHandler} size='small' type='text' className={style.ButtonDisconnect}>{'Disconnect'.toUpperCase()}</Button>
            }
        </div>
    )
}

export {Connector}