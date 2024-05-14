import { FC, useEffect, useState } from 'react';
import style from './PortConfig.module.scss';
import { IPortConfig } from '../model/types';
import { SerialPort } from 'serialport';

type SerialPortListType = Awaited<ReturnType<typeof SerialPort.list>>;

const PortConfig: FC<IPortConfig> = ({ type }): JSX.Element => {
    const [devices, setDevices] = useState<SerialPortListType>([]);

    useEffect(() => {
        window.api.getPortList().then(devices => setDevices(devices));
        
    }, []);

    return (
        <div className={style.Port}>
            <span>PORT: </span>
            <select>
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
