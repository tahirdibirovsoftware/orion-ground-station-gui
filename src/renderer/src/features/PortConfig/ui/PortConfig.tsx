import { FC, useEffect, useRef, useState } from 'react';
import style from './PortConfig.module.scss';
import { IPortConfig } from '../model/types';
import { SerialPort } from 'serialport';
import { useAppDispatch, useAppSelector } from '@renderer/app/redux/hooks';
import { setFlightConfig, setIoTConfig } from '../model/PortConfigSlice';

type SerialPortListType = Awaited<ReturnType<typeof SerialPort.list>>;

const PortConfig: FC<IPortConfig> = ({ type }): JSX.Element => {
    const [devices, setDevices] = useState<SerialPortListType>([]);
    const dispatch = useAppDispatch();
    const paths = useAppSelector(state=>state.portConfigReducer.flightPath)
    const selectRef = useRef<HTMLSelectElement>(null);
    useEffect(() => {
        window.api.getPortList().then(setDevices);
        window.api.onPortListUpdated(setDevices);
    }, []);

    useEffect(()=>{
        console.log('paths: ',paths)
        console.log('devices: ', devices)
        if(!devices.filter(device => device.manufacturer).length){
            dispatch(setFlightConfig({path: ''}))
            dispatch(setIoTConfig({path: ''}))
        }
    },[devices])

    const setDevice = (event: React.ChangeEvent<HTMLSelectElement>): void => {
        if (type === 'flight') {
            dispatch(setFlightConfig({ path: event.target.value }));
        }
        if (type === 'iot') {
            dispatch(setIoTConfig({ path: event.target.value }));
        }
    };

    const isPortAvailable = (): number | undefined => devices.filter(device => device.manufacturer).length

    return (
        <div className={style.Port}>
            <span>PORT: </span>
            <select ref={selectRef} onChange={setDevice}>
                {!isPortAvailable() ? (
                    <option key="not-connected">Not Connected</option>
                ) : (
                    <>
                        <option key="not-selected" value="">
                            Not Selected
                        </option>
                        {devices.map(device => (
                            device.manufacturer && (
                                <option key={device.path} value={device.path}>
                                    {device.manufacturer || 'Not Active'}
                                </option>
                            )
                        ))}
                    </>
                )}
            </select>
        </div>
    );
};

export { PortConfig };
