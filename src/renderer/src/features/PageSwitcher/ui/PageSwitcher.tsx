import { Link } from 'react-router-dom'
import style from './PageSwitcher.module.scss'
import { FC, useContext } from 'react'
import { IPageSwitcher } from '../model/types'
import { ThemeContext } from '../../../app/providers/ThemeProvider/ThemeProvider'
import { themeSetter } from '../../../shared/config/theme/themeSetter'



const PageSwitcher:FC<IPageSwitcher> = ({path, title, styleOverride}):JSX.Element => {

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
            <Link style={localLinkStyles} className={style.Link} to={`/${path}`}>{title.toUpperCase()}</Link>
        </div>    
    )
}

export {PageSwitcher}