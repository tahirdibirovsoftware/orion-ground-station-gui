import { FC, useEffect, useState } from 'react';
import style from './Timer.module.scss';
import { ITimer } from '../model/types';

const Timer:FC<ITimer> = ({size}):JSX.Element => {

    const [hours, setHours] = useState<number>(0)
    const [minutes, setMinutes] = useState<number>(0)
    const [seconds, setSeconds] = useState<number>(0)


    useEffect(()=>{
        setInterval(()=>{
            setHours(new Date().getHours())
            setMinutes(new Date().getMinutes())
            setSeconds(new Date().getSeconds())
        },1000)
    },[])


    const localStyles:React.CSSProperties = {
        color: 'rgba(200,200,200,1)',
        backgroundColor: 'rgba(30,30,30)',
        width: `${size}em`,
        height: `${size/3}em`,
        fontSize: `${size/2}em`
    }


    return(
        <div style={localStyles} className={style.Timer}>
            <span>{hours}:</span>
            <span>{minutes<10 ? '0' + minutes: minutes}:</span>
            <span>{seconds<10 ? '0' + seconds: seconds}</span>
        </div>
    )
}

export {Timer};