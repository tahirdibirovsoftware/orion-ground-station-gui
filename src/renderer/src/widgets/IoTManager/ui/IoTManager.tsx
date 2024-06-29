import { FC, useContext } from 'react'
import style from './IoTManager.module.scss'
import { ThemeContext } from '../../../app/providers/ThemeProvider/ThemeProvider'
import { themeSetter } from '../../../shared/config/theme/model/themeSetter'
import { IoTView } from '../../../entities/IoTView'
import { IoTDataSender } from '../../../features/IoTDataSender/ui/IoTDataSender'
import { IIoTManager } from '../model/types'



const IoTManager:FC<IIoTManager> = ({iotData}):JSX.Element => {

    const {theme} = useContext(ThemeContext)

    const localStyles:React.CSSProperties = {
        ...themeSetter(theme)
    }

    return(
        <div style={localStyles} className={style.IoTManager}>
            <IoTView iotData={iotData}/>
            <IoTDataSender/>
        </div>
    )
}

export {IoTManager}