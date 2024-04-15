import { useState, useEffect } from 'react';
import style from './Clock.module.scss';

interface ITime {
    hours: number;
    minutes: number;
    seconds: number;
}

const Clock = (): JSX.Element => {
    const [time, setTime] = useState<ITime>({
        hours: new Date().getHours(),
        minutes: new Date().getMinutes(),
        seconds: new Date().getSeconds()
    });

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTime({
                hours: new Date().getHours(),
                minutes: new Date().getMinutes(),
                seconds: new Date().getSeconds()
            });
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className={style.Clock}>
            <span className={style.time}>
                {time.hours}:{time.minutes < 10 ? `0${time.minutes}` : time.minutes}:{time.seconds < 10 ? `0${time.seconds}` : time.seconds}
            </span>
        </div>
    );
}

export { Clock };
