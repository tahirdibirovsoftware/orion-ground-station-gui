import { FC } from 'react';
import style from './Connector.module.scss';
import { IConnector } from '../model/types';
import { Button } from 'antd';


const Connector:FC<IConnector> = ({type}):JSX.Element => {

    let isConnected = true

    return(
        <div className={style.Connector}>
            {
                isConnected ? <Button size='small' type='text' className={style.ButtonConnect}>{'Connect'.toUpperCase()}</Button> :
                <Button size='small' type='text' className={style.ButtonDisconnect}>{'Disconnect'.toUpperCase()}</Button>
            }
        </div>
    )
}

export {Connector}