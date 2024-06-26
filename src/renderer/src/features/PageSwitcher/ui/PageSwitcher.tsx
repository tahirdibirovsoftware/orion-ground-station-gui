import { Link } from 'react-router-dom'
import style from './PageSwitcher.module.scss'
import { FC, useContext } from 'react'
import { IPageSwitcher } from '../model/types'
import { ThemeContext } from '../../../app/providers/ThemeProvider/ThemeProvider'
import { themeSetter } from '../../../shared/config/theme/themeSetter'
import { Trans, useTranslation } from 'react-i18next'



const PageSwitcher:FC<IPageSwitcher> = ({path, title, styleOverride}):JSX.Element => {
    useTranslation()
    const {theme} = useContext(ThemeContext)
    
    const localLinkStyles:React.CSSProperties = {
        ...themeSetter(theme),
        border: 'unset',
    }

    let localElementStyles:React.CSSProperties = {
        ...themeSetter(theme),
        borderRight: 'unset',
        borderLeft: 'unset'
    }

    styleOverride ? localElementStyles = {...localElementStyles, ...styleOverride} : localElementStyles

    return(
         <div style={localElementStyles} className={style.PageSwitcher}>
            <Link style={localLinkStyles} className={style.Link} to={`/${path}`}><Trans>{title.toUpperCase()}</Trans></Link>
        </div>    
    )
}

export {PageSwitcher}