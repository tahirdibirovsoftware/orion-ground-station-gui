import { Button } from 'antd';
import style from './IoTDataSender.module.scss';


const IoTDataSender = ():JSX.Element => {
    return(
        <div className={style.IoTDataSender}>
            <Button className={style.IoTButton} type='primary'>Send</Button>
        </div>
    )
}

export {IoTDataSender}