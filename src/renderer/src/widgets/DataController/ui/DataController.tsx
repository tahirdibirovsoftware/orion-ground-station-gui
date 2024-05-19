import style from './DataController.module.scss';
import { Button } from 'antd';
import { PlayCircleOutlined, StopOutlined } from '@ant-design/icons';
import { useAppSelector } from '@renderer/app/redux/hooks';

const DataController = (): JSX.Element => {

    const flowState = useAppSelector(state => state.dataControllerReducer.dataFlow);
  

    const startFlow = (): void => {
       
    };

    const stopFlow = (): void => {
      
    };

    const continueFlow = (): void => {
       
    };

    switch (flowState) {
        case 'started':
            return <Button onClick={stopFlow} className={style.stopButton} icon={<StopOutlined />}>Terminate</Button>;
        case 'stopped':
            return <Button onClick={startFlow} className={style.startButton} icon={<PlayCircleOutlined />}>Run</Button>;
        case 'waited':
            return <Button onClick={continueFlow} className={style.stopButton} icon={<StopOutlined />}>Continue</Button>;
        default:
            return <></>;
    }
};

export {DataController}