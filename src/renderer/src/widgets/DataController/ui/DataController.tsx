import style from './DataController.module.scss';

import { DataFlow } from '../model/types';
import { useContext, useState } from 'react';
import { themeSetter } from '@renderer/shared/config/theme/themeSetter';
import { ThemeContext } from '@renderer/app/providers/ThemeProvider/ThemeProvider';
import { useAppSelector } from '@renderer/app/redux/hooks';


const DataController = (): JSX.Element => {

 
    const [flowState, setFlowState] = useState<DataFlow>('stopped')
    const {theme} = useContext(ThemeContext)
    const flightPath = useAppSelector(state=>state.portConfigReducer.flightPath)
    const flightBaudRate = useAppSelector(state=>state.baudRateReducer.flightBaudRate)

    const startWriting = (): void => {
        window.api.startDbWriting(flightPath, flightBaudRate)
       setFlowState('started')
    };

    const stopWriting = (): void => {
        window.api.stopDbWriting(flightPath)
        setFlowState('stopped')
    };

    const continueWriting = (): void => {
       setFlowState('started')
    };

    const localeStyles:React.CSSProperties = {
        ...themeSetter(theme)
    }

    const recordState = (): string =>{
        if(flowState==='started') return 'Recording...';
        else if(flowState==='stopped') return 'Not Recording';
        else if(flowState==='waited') return 'Resume Recording'
        return ''
    }

    const ButtonType = ():JSX.Element =>{
        switch (flowState) {
            case 'started':
                return <button onClick={stopWriting} className={style.stopButton}></button>;
            case 'stopped':
                return <button onClick={startWriting} className={style.recordButton}></button>;
            case 'waited':
                return <button onClick={continueWriting} className={style.resumeButton}></button>;
            default:
                return <></>;
        }
    }

    return (
        <div className={style.DataController} style={localeStyles}>
            <ButtonType/>
            <span className="recordState">{recordState()}</span>
        </div>
    )
};

export {DataController}