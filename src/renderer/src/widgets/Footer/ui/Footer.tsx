import style from './Footer.module.scss';
import teknofestLogo from '../assets/TeknofestLogo.png'
import { themeSetter } from '../../../shared/config/theme/themeSetter';
import { useContext } from 'react';
import { ThemeContext } from '../../../app/providers/ThemeProvider/ThemeProvider';
import { AppConfigContext } from 'antd/es/app/context';
import { Logo } from '../../../entities/Logo';



const Footer = ():JSX.Element => {

    const { theme } = useContext(ThemeContext)

    let localStyles:React.CSSProperties = {
        ...themeSetter(theme),
        borderRight: 'unset',
        borderLeft: 'unset',
        borderBottom: 'unset' 
    } 


    return(
        <div style={localStyles} className={style.Footer}>
            <img className={style.teknofestLogo} src={teknofestLogo}></img>
            <span className={style.naaLogo}>{'National Aviation Academy'.toUpperCase()}</span>
            <Logo size={3} title='Orion'/>
            <span className={style.copy}>&copy; {new Date().getFullYear()}, Teknofest</span>
        </div>
    )
}

export { Footer } 