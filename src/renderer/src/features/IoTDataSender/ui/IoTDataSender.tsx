import { Button } from 'antd';
import style from './IoTDataSender.module.scss';


const IoTDataSender = ():JSX.Element => {
    return(
        <div className={style.IoTDataSender}>
            <Button type='primary'>Send IoT Data</Button>
        </div>
    )
}

export {IoTDataSender}