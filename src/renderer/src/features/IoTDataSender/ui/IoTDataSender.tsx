import React, { useCallback, useMemo } from 'react';
import { Button } from 'antd';
import { Trans, useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '@renderer/app/redux/hooks';
import { setIot } from '@renderer/widgets/SatController/model/controllingData';
import style from './IoTDataSender.module.scss';

const IoTDataSender: React.FC = () => {
    useTranslation();
    const dispatch = useAppDispatch();

    const iotData = useAppSelector(state => state.iotDataStoreReducer);
    const flightPath = useAppSelector(state => state.portConfigReducer.flightPath);

    const latestIotData = useMemo(() => {
        return iotData[iotData.length - 1];
    }, [iotData]);

    const iotDataHandler = useCallback((): void => {
        if (latestIotData) {
            const sentData = JSON.stringify({
                parachuteState: NaN,
                iot: latestIotData.temperature
            });
            dispatch(setIot({ iot: latestIotData.temperature }));
            window.api?.sendIotData(sentData, flightPath);
        }
    }, [dispatch, latestIotData, flightPath]);

    return (
        <div className={style.IoTDataSender}>
            <Button
                onClick={iotDataHandler}
                className={style.IoTButton}
                type='primary'
            >
                <Trans>SEND</Trans>
            </Button>
        </div>
    );
};

export { IoTDataSender };