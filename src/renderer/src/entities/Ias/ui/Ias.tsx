import { useContext } from 'react'
import { themeSetter } from '../../../shared/config/theme/themeSetter'
import style from './Ias.module.scss'
import { ThemeContext } from '../../../app/providers/ThemeProvider/ThemeProvider'

const Ias = ():JSX.Element => {

    const { theme } = useContext(ThemeContext)
    const mockBinary = [0,0,1,0,0]

    return(
        <div className={style.Ias} style={themeSetter(theme)}>
            {
                mockBinary.map((binary, idx)=>(
                    binary ? <div className={style.ErrorBox} key={idx}>{binary}</div> : <div key={idx} className={style.SuccessBox}>{binary}</div>
                ))
            }
        </div>
    )
}

export {Ias}