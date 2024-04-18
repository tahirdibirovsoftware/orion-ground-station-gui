import { useState, useEffect } from 'react';
import style from './Clock.module.scss';

interface ITime {
    day: number,
    month: number,
    year: number,
    hours: number;
    minutes: number;
    seconds: number;
}

const Clock = (): JSX.Element => {
    const [time, setTime] = useState<ITime>({
        day: new Date().getDay(),
        month: new Date().getMonth(),
        year: new Date().getFullYear(),
        hours: new Date().getHours(),
        minutes: new Date().getMinutes(),
        seconds: new Date().getSeconds()
    });

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTime({
                day: new Date().getDay(),
                month: new Date().getMonth(),
                year: new Date().getFullYear(),
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
                {time.day < 10 ? `0${time.day}`: time.day}/{time.month < 10 ? `0${time.month}`: time.month}/{time.year} {  }
                {time.hours}:{time.minutes < 10 ? `0${time.minutes}` : time.minutes}:{time.seconds < 10 ? `0${time.seconds}` : time.seconds}
            </span>
        </div>
    );
}

export { Clock };
