import { Timer } from '@renderer/entities/Timer'
import style from './DataController.module.scss'
import { Button } from 'antd'
import { PlayCircleOutlined, StopOutlined } from '@ant-design/icons'


const DataController = ():JSX.Element =>{
    return(
        <div className={style.DataController}>
            <Timer size={4}/>
            <Button className={style.startButton} icon={<PlayCircleOutlined/>}>Start</Button>
            <Button className={style.stopButton} icon={<StopOutlined/>}>Stop</Button>
        </div>
    )
}

export { DataController }