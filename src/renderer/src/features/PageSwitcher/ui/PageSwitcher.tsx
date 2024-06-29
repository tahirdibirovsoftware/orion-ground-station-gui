import { Link } from 'react-router-dom'
import style from './PageSwitcher.module.scss'
import { FC, useContext } from 'react'
import { IPageSwitcher } from '../model/types'
import { ThemeContext } from '../../../app/providers/ThemeProvider/ThemeProvider'
import { themeSetter } from '../../../shared/config/theme/model/themeSetter'
import { Trans, useTranslation } from 'react-i18next'
import { BORDER_ONLY_BOTTOM, BORDER__ONLY_TOP_BOTTOM, NO_BORDER } from '@renderer/shared/config/theme/constants'



const PageSwitcher:FC<IPageSwitcher> = ({path, title, styleOverride}):JSX.Element => {
    useTranslation()
    const {theme} = useContext(ThemeContext)
    
    const localLinkStyles:React.CSSProperties = {
        ...themeSetter(theme, NO_BORDER),
    }

    let localElementStyles:React.CSSProperties = {
        ...themeSetter(theme, BORDER_ONLY_BOTTOM),
    }

    if(title.toUpperCase()==='FLIGHT_MODE') localElementStyles = {...themeSetter(theme, {...BORDER__ONLY_TOP_BOTTOM})}

    styleOverride ? localElementStyles = {...localElementStyles, ...styleOverride} : localElementStyles

    return(
         <div style={localElementStyles} className={style.PageSwitcher}>
            <Link style={localLinkStyles} className={style.Link} to={`/${path}`}><Trans>{title.toUpperCase()}</Trans></Link>
        </div>    
    )
}

export {PageSwitcher}