import { useContext } from 'react'
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


const SatController = ():JSX.Element => {

    const { theme } = useContext(ThemeContext)

    let localStyles:React.CSSProperties = {
        ...themeSetter(theme)
    }

    return(
        <div style={localStyles} className={style.SatController}>
            <SatStatus/>
            <Mfm/>
            <AltDiff/>
            <IoTManager/>
            <ParachuteCR/>
            <Ias/>
            <ErrorTerminal/>
        </div>
    )
}

export {SatController}