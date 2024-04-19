import { FC } from 'react'
import style from './System.module.scss'
import { ISystemInfo } from '../model'
import { useTerminalSkin } from '@renderer/entities/Terminal/lib'

const SystemInfo:FC<ISystemInfo> = ({pid, platform, arch}):JSX.Element => {
    return(
        <div style={useTerminalSkin()} className={style.SystemInfo}>
            <span className="platform">PLATFORM: {platform}</span>
            <span className="arch">ARCHITECTURE: {arch}</span>
            <span className="process">PID: {pid}</span>
        </div>
    )
}

export { SystemInfo }