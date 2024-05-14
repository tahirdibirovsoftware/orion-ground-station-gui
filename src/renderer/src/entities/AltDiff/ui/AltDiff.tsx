import { useContext } from 'react';
import { themeSetter } from '../../../shared/config/theme/themeSetter';
import style from  './AltDiff.module.scss';
import { ThemeContext } from '../../../app/providers/ThemeProvider/ThemeProvider';


const AltDiff = ():JSX.Element => {

    const { theme } = useContext(ThemeContext)

    let localStyles:React.CSSProperties = {
        ...themeSetter(theme)
    }

    return(
        <div style={localStyles} className={style.AltDiff}>
            <span>Altidtude Difference</span>
        </div>
    )
}

export {AltDiff}