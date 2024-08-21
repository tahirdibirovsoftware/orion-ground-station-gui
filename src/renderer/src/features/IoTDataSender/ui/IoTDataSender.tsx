import React, { useCallback, useMemo } from 'react';
import { Button } from 'antd';
import style from './IoTDataSender.module.scss';
import { useAppDispatch, useAppSelector } from '@renderer/app/redux/hooks';
import { initiaControllingState, setIot } from '@renderer/widgets/SatController/model/controllingData';
import { Trans, useTranslation } from 'react-i18next';

const IoTDataSender: React.FC = () => {
    useTranslation();
    const dispatch = useAppDispatch();

    const { latestIotData, flightPath } = useAppSelector(state => ({
        latestIotData: state.iotDataStoreReducer[state.iotDataStoreReducer.length - 1],
        flightPath: state.portConfigReducer.flightPath
    }));

    const iotDataHandler = useCallback((): void => {
        if (latestIotData) {
            const sentData = JSON.stringify({
                ...initiaControllingState,
                iot: latestIotData.temperature
            });
            dispatch(setIot({ iot: latestIotData.temperature }));
            window.api?.sendIotData(sentData, flightPath);
        }
    }, [dispatch, latestIotData, flightPath]);

    const isButtonDisabled = useMemo(() => !latestIotData || !flightPath, [latestIotData, flightPath]);

    return (
        <div className={style.IoTDataSender}>
            <Button
                onClick={iotDataHandler}
                className={style.IoTButton}
                type="primary"
                disabled={isButtonDisabled}
            >
                <Trans>SEND</Trans>
            </Button>
        </div>
    );
};

export { IoTDataSender };