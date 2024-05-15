import style from './DataController.module.scss'
import { Button } from 'antd'
import { PlayCircleOutlined, StopOutlined } from '@ant-design/icons'
import { useAppDispatch, useAppSelector } from '@renderer/app/redux/hooks'
import { controlTheFlow } from '../model/dataControllerSlice'


const DataController = ():JSX.Element =>{

    const dispatch = useAppDispatch()
    const isFlowActive = useAppSelector(state=>state.dataControllerReducer.dataFlow) === 'started'

    const startFlow = ():void=>{
        //Start Logic
        dispatch(controlTheFlow('started'))
    }

    const stopFlow = ():void => {
        //Stop Logic
        dispatch(controlTheFlow('stopped'))
    }

    return(
        <div className={style.DataController}>
            {!isFlowActive ?<Button onClick={startFlow} className={style.startButton} icon={<PlayCircleOutlined/>}>START</Button>:
            <Button onClick={stopFlow} className={style.stopButton} icon={<StopOutlined/>}>STOP</Button>}
        </div>
    )
}

export { DataController }