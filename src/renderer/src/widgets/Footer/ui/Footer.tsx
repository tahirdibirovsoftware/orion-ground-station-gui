import style from './Footer.module.scss';
import teknofestLogoBlack from '../assets/teknofest-black.png';
import teknofestLogoWhite from '../assets/teknofest-white.png';
import { themeSetter } from '../../../shared/config/theme/model/themeSetter';
import { useContext } from 'react';
import { ThemeContext } from '../../../app/providers/ThemeProvider/ThemeProvider';
import { Logo } from '../../../entities/Logo';
import { BORDER_ONLY_LEFT, BORDER_ONLY_TOP } from '@renderer/shared/config/theme/constants';
import { setImageToTheme } from '@renderer/shared/config/theme/model/imageTheme';



const Footer = ():JSX.Element => {

    const { theme } = useContext(ThemeContext)

    const localStyles:React.CSSProperties = {
        ...themeSetter(theme, {...BORDER_ONLY_TOP, ...BORDER_ONLY_LEFT}),
    } 

 

    return(
        <div style={localStyles} className={style.Footer}>
            <img className={style.teknofestLogo} src={setImageToTheme(theme, teknofestLogoWhite, teknofestLogoBlack)}></img>
            <span className={style.naaLogo}>{'National Aviation Academy'.toUpperCase()}</span>
            <Logo size={3} title='Orion'/>
            <span className={style.copy}>&copy; {new Date().getFullYear()}, Teknofest</span>
        </div>
    )
}

export { Footer } 