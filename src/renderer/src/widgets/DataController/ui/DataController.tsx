import { useEffect } from 'react';
import style from './DataController.module.scss';
import { Button } from 'antd';
import { PlayCircleOutlined, StopOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@renderer/app/redux/hooks';
import { controlTheFlow } from '../model/dataControllerSlice';
import { addPersistedTelemetry, clearPersistedTelemetry } from '../model/persistedFlightDataStoreSlice';
import { ITelemetry } from 'src/global/types/types';

const DataController = (): JSX.Element => {
    const dispatch = useAppDispatch();
    const flowState = useAppSelector(state => state.dataControllerReducer.dataFlow);
    const flightData = useAppSelector(state => state.flightDataStoreReducer);
    const flightConnectionState = useAppSelector(state => state.connectorReducer.flightConnect);
    const persistedFlightDataHandler = (data:ITelemetry):void => {dispatch(addPersistedTelemetry(data))};

    useEffect(() => {
        if (flightConnectionState === 'connected' && flowState === 'started') {
            window.api.getFlightData(persistedFlightDataHandler)
        }
    }, [flightConnectionState, flowState, flightData, dispatch]);

    const startFlow = (): void => {
        dispatch(controlTheFlow('started'));
    };

    const stopFlow = (): void => {
        dispatch(controlTheFlow('stopped'));
        dispatch(clearPersistedTelemetry());
    };

    const continueFlow = (): void => {
        dispatch(controlTheFlow('waited'));
    };

    switch (flowState) {
        case 'started':
            return <Button onClick={stopFlow} className={style.stopButton} icon={<StopOutlined />}>Stop</Button>;
        case 'stopped':
            return <Button onClick={startFlow} className={style.startButton} icon={<PlayCircleOutlined />}>Start</Button>;
        case 'waited':
            return <Button onClick={continueFlow} className={style.stopButton} icon={<StopOutlined />}>Continue</Button>;
        default:
            return <></>;
    }
};

export { DataController };
