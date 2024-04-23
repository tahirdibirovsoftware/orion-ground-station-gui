import { FC } from 'react'
import style from './Altitude.module.scss'
import { IAltitudeDiff } from '../model'
import { useTerminalSkin } from '@renderer/entities/Terminal/lib'

const AltitudeDiff:FC<IAltitudeDiff> = ({altitudeDifference}):JSX.Element => {

    return(
        <div style={useTerminalSkin()} className={style.AltitudeDiff}>
            <span>Altitude Difference: {altitudeDifference}</span>
        </div>
    )
    
}

export {AltitudeDiff}