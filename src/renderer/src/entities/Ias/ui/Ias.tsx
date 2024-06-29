import { FC, useContext } from 'react'
import { themeSetter } from '../../../shared/config/theme/model/themeSetter'
import style from './Ias.module.scss'
import { ThemeContext } from '../../../app/providers/ThemeProvider/ThemeProvider'
import { IIas } from '../model/types'

const Ias:FC<IIas> = ({errorCode}):JSX.Element => {

    const { theme } = useContext(ThemeContext)
    const processedErrorCode = errorCode && errorCode.toString().split('').map(code=>!isNaN(Number(code)) ? parseInt(code): '');

    return(
        <div className={style.Ias} style={themeSetter(theme)}>
            {
               processedErrorCode && processedErrorCode.map((binary, idx)=>(
                    binary ? <div className={style.ErrorBox} key={idx}>{binary}</div> : <div key={idx} className={style.SuccessBox}>{binary}</div>
                ))
            }
        </div>
    )
}

export {Ias}