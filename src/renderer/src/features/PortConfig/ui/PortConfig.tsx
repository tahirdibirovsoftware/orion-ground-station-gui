import { FC, useEffect, useState } from 'react';
import style from './PortConfig.module.scss';
import { IPortConfig } from '../model/types';
import { SerialPort } from 'serialport';
import { useAppDispatch } from '@renderer/app/redux/hooks';
import { setFlightConfig, setIoTConfig } from '../model/PortConfigSlice';

type SerialPortListType = Awaited<ReturnType<typeof SerialPort.list>>;

const PortConfig: FC<IPortConfig> = ({ type }): JSX.Element => {
    const [devices, setDevices] = useState<SerialPortListType>([]);
    const dispatch = useAppDispatch()


    useEffect(() => {
        window.api.getPortList().then(setDevices);
        window.api.onPortListUpdated(setDevices);
    }, []);


    const setDevice = (event: React.ChangeEvent<HTMLSelectElement>):void => {
        if(type==='flight')
        dispatch(setFlightConfig({path: event.target.value}))
        if(type==='iot')
        dispatch(setIoTConfig({path: event.target.value}))
    }


    return (
        <div className={style.Port}>
            <span>PORT: </span>
            <select onChange={setDevice}>
                {Boolean(!devices.filter(device=>device.manufacturer).length) && <option>Not Connected</option>}
                {devices.length > 0 &&
                    devices.map(device => ( device.manufacturer &&
                        <option key={device.path} value={device.path}>
                            {device.manufacturer || 'Not Active'}
                        </option> 
                    ))}
            </select>
        </div>
    );
};

export { PortConfig };
