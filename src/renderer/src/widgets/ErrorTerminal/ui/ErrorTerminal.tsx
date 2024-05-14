import { useContext } from 'react'
import style from './Errorterminal.module.scss'
import { ThemeContext } from '../../../app/providers/ThemeProvider/ThemeProvider'
import { themeSetter } from '../../../shared/config/theme/themeSetter'
import { Error } from '../../../entities/Error'


const ErrorTerminal = ():JSX.Element => {

    const {theme} = useContext(ThemeContext)
    let localStyles:React.CSSProperties = {
        ...themeSetter(theme)
    }

    return(
        <div style={localStyles} className={style.ErrorTerminal}>
            <Error content='Flight Error!'/>
            <Error content='Flight Error!'/>
            <Error content='Flight Error!'/>
            <Error content='Flight Error!'/>
            <Error content='Flight Error!'/>
        </div>
    )
}

export {ErrorTerminal}