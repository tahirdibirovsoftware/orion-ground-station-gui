import React, { useEffect, useRef, useCallback, useMemo } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '@renderer/app/redux/hooks';
import { setDevices, setFlightConfig, setIoTConfig } from '../model/PortConfigSlice';
import style from './PortConfig.module.scss';
import { SerialPort } from 'serialport';

export type SerialPortListType = Awaited<ReturnType<typeof SerialPort.list>>;

interface IPortConfig {
    type: 'flight' | 'iot';
}

const PortConfig: React.FC<IPortConfig> = ({ type }) => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const selectRef = useRef<HTMLSelectElement>(null);

    const devices = useAppSelector(state => state.portConfigReducer.devices);
    const path = useAppSelector(state => 
        type === 'flight' ? state.portConfigReducer.flightPath : state.portConfigReducer.iotPath
    );
    const isConnected = useAppSelector(state => 
        type === 'flight'
            ? state.connectorReducer.flightConnect === 'connected'
            : state.connectorReducer.iotConnect === 'connected'
    );

    const deviceHandler = useCallback((devices: SerialPortListType): void => {
        dispatch(setDevices(devices));
    }, [dispatch]);

    useEffect(() => {
        const fetchDevices = async (): Promise<void> => {
            const devices = await window.api.getPortList();
            deviceHandler(devices);
        };

        fetchDevices();
        window.api.onPortListUpdated(deviceHandler);

        return () => {
            // Clean up listener if necessary
            // window.api.removePortListUpdatedListener(deviceHandler);
        };
    }, [deviceHandler]);

    useEffect(() => {
        if (!devices.some(device => device.manufacturer)) {
            dispatch(setFlightConfig({ path: '' }));
            dispatch(setIoTConfig({ path: '' }));
        }
    }, [devices, dispatch]);

    const setDevice = useCallback((event: React.ChangeEvent<HTMLSelectElement>): void => {
        const action = type === 'flight' ? setFlightConfig : setIoTConfig;
        dispatch(action({ path: event.target.value }));
    }, [dispatch, type]);

    const availableDevices = useMemo(() => devices.filter(device => device.manufacturer), [devices]);

    const options = useMemo(() => {
        if (!availableDevices.length) {
            return [<option key="not-connected" value="not-connected">{t('NOT_CONNECTED')}</option>];
        }

        return [
            <option key="not-selected" value="">
                {path || t('NOT_SELECTED')}
            </option>,
            ...availableDevices.map(device => (
                <option key={device.path} value={device.path}>
                    {device.manufacturer || t('NOT_ACTIVE')}
                </option>
            ))
        ];
    }, [availableDevices, path, t]);

    return (
        <div className={style.Port}>
            <span><Trans>SOURCE</Trans>: </span>
            <select disabled={isConnected} ref={selectRef} onChange={setDevice} value={path || ''}>
                {options}
            </select>
        </div>
    );
};

export { PortConfig };