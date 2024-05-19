import { FC, useContext } from 'react'
import { themeSetter } from '../../../shared/config/theme/themeSetter'
import style from './Satcontroller.module.scss'
import { ThemeContext } from '../../../app/providers/ThemeProvider/ThemeProvider'
import { Ias } from '../../../entities/Ias'
import { ErrorTerminal } from '../../ErrorTerminal'
import { AltDiff } from '../../../entities/AltDiff/ui/AltDiff'
import { Mfm } from '../../../features/Mfm'
import { IoTManager } from '../../IoTManager/ui/IoTManager'
import { ParachuteCR } from '../../../features/ParachuteCR'
import { SatStatus } from '../../../entities/SatStatus'
import { ISatController } from '../model/types'


const SatController:FC<ISatController> = ({data}):JSX.Element => {

    const { theme } = useContext(ThemeContext)

    const localStyles:React.CSSProperties = {
        ...themeSetter(theme)
    }

    const satStatus = data[data.length-1].satelliteStatus
    const errorCode = data[data.length-1].errorCode
    const altitudeDifference = data[data.length-1].altitudeDifference

    return(
        <div style={localStyles} className={style.SatController}>
            <SatStatus satStatus={satStatus}/>
            <Mfm/>
            <AltDiff altitudeDifference={altitudeDifference}/>
            <IoTManager/>
            <ParachuteCR/>
            <Ias errorCode={errorCode}/>
            <ErrorTerminal errorCode={errorCode}/>
        </div>
    )
}

export {SatController}