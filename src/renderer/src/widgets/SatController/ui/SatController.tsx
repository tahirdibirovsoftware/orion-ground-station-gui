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
import { DescentRate } from '@renderer/entities/DescentRate'
import { DataController } from '@renderer/widgets/DataController'


const SatController:FC<ISatController> = ({flightData, iotData}):JSX.Element => {

    const { theme } = useContext(ThemeContext)

    const localStyles:React.CSSProperties = {
        ...themeSetter(theme)
    }

    
    const errorCode = flightData[flightData.length-1].errorCode

    return(
        <div style={localStyles} className={style.SatController}>
            <SatStatus flightData={flightData}/>
            <Mfm/>
            <AltDiff flightData={flightData}/>
            <DescentRate flightData={flightData}/> 
            <IoTManager iotData={iotData}/>
            <ParachuteCR/>
            <Ias errorCode={errorCode}/>
            <ErrorTerminal errorCode={errorCode}/>
            <DataController/>
        </div>
    )
}

export {SatController}