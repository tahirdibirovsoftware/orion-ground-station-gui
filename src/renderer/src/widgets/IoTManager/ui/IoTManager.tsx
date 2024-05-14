import { useContext } from 'react'
import style from './IoTManager.module.scss'
import { ThemeContext } from '../../../app/providers/ThemeProvider/ThemeProvider'
import { themeSetter } from '../../../shared/config/theme/themeSetter'
import { IoTView } from '../../../entities/IoTView'
import { IoTDataSender } from '../../../features/IoTDataSender/ui/IoTDataSender'



const IoTManager = ():JSX.Element => {

    const {theme} = useContext(ThemeContext)

    let localStyles:React.CSSProperties = {
        ...themeSetter(theme)
    }

    return(
        <div style={localStyles} className={style.IoTManager}>
            <IoTView/>
            <IoTDataSender/>
        </div>
    )
}

export {IoTManager}