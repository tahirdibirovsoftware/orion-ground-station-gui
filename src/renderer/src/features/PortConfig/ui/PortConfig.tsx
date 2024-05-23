import { FC, useEffect, useRef } from 'react';
import style from './PortConfig.module.scss';
import { IPortConfig } from '../model/types';
import { SerialPort } from 'serialport';
import { useAppDispatch, useAppSelector } from '@renderer/app/redux/hooks';
import { setDevices, setFlightConfig, setIoTConfig } from '../model/PortConfigSlice';

type SerialPortListType = Awaited<ReturnType<typeof SerialPort.list>>;

const PortConfig: FC<IPortConfig> = ({ type }): JSX.Element => {
    const dispatch = useAppDispatch();
    const paths = useAppSelector(state => state.portConfigReducer.flightPath);
    const selectRef = useRef<HTMLSelectElement>(null);
    const devices = useAppSelector(state => state.portConfigReducer.devices);
    
    const deviceHandler = (devices: SerialPortListType): void => {
        dispatch(setDevices(devices));
    };

    useEffect(() => {
        const fetchDevices = async ():Promise<void> => {
            const devices = await window.api.getPortList();
            deviceHandler(devices);
        };

        fetchDevices();
        window.api.onPortListUpdated(deviceHandler);
    }, []);

    useEffect(() => {
        console.log('paths: ', paths);
        console.log('devices: ', devices);
        if (!devices.filter(device => device.manufacturer).length) {
            dispatch(setFlightConfig({ path: '' }));
            dispatch(setIoTConfig({ path: '' }));
        }
    }, [devices]);

    const setDevice = (event: React.ChangeEvent<HTMLSelectElement>): void => {
        if (type === 'flight') {
            dispatch(setFlightConfig({ path: event.target.value }));
        }
        if (type === 'iot') {
            dispatch(setIoTConfig({ path: event.target.value }));
        }
    };

    const isPortAvailable = (): number | undefined => devices.filter(device => device.manufacturer).length;

    return (
        <div className={style.Port}>
            <span>Source: </span>
            <select ref={selectRef} onChange={setDevice}>
                {!isPortAvailable() ? (
                    <option key="not-connected">Not Connected</option>
                ) : (
                    <>
                        <option key="not-selected" value="">
                            Not Selected
                        </option>
                        {devices.map(device =>
                            device.manufacturer ? (
                                <option key={device.path} value={device.path}>
                                    {device.manufacturer || 'Not Active'}
                                </option>
                            ) : null
                        )}
                    </>
                )}
            </select>
        </div>
    );
};

export { PortConfig };
