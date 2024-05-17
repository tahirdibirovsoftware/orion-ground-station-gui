import style from './DataController.module.scss'
import { Button } from 'antd'
import { PlayCircleOutlined, StopOutlined } from '@ant-design/icons'
import { useAppDispatch, useAppSelector } from '@renderer/app/redux/hooks'
import { controlTheFlow } from '../model/dataControllerSlice'


const DataController = (): JSX.Element => {

    const dispatch = useAppDispatch()
    const flowState = useAppSelector(state => state.dataControllerReducer.dataFlow)
    // const isFlowActive = useAppSelector(state => state.dataControllerReducer.dataFlow) === 'started'

    const startFlow = (): void => {
        //Start Logic
        dispatch(controlTheFlow('started'))
    }

    const stopFlow = (): void => {
        //Stop Logic
        dispatch(controlTheFlow('stopped'))
    }


    const continueFlow = (): void => {
        dispatch(controlTheFlow('waited'))
    }


    switch (flowState) {
        case 'started':
            return <Button onClick={stopFlow} className={style.stopButton} icon={<StopOutlined />}>Stop</Button>;
        case 'stopped':
            return <Button onClick={startFlow} className={style.startButton} icon={<PlayCircleOutlined />}>Start</Button>;
        case 'waited':
            return <Button onClick={continueFlow} className={style.stopButton} icon={<StopOutlined />}>Continue</Button>;
    }



}

export { DataController }