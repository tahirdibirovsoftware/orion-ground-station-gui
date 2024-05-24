import style from './DataController.module.scss';
import { Button } from 'antd';
import { PlayCircleOutlined, StopOutlined } from '@ant-design/icons';
import { DataFlow } from '../model/types';
import { useState } from 'react';


const DataController = (): JSX.Element => {

 
    const [flowState, setFlowState] = useState<DataFlow>('started')
  

    const startWriting = (): void => {
       setFlowState('started')
    };

    const stopWriting = (): void => {
      
    };

    const continueWriting = (): void => {
       
    };

    switch (flowState) {
        case 'started':
            return <Button onClick={stopWriting} className={style.stopButton} icon={<StopOutlined />}>Terminate</Button>;
        case 'stopped':
            return <Button onClick={startWriting} className={style.startButton} icon={<PlayCircleOutlined />}>Run</Button>;
        case 'waited':
            return <Button onClick={continueWriting} className={style.stopButton} icon={<StopOutlined />}>Continue</Button>;
        default:
            return <></>;
    }
};

export {DataController}