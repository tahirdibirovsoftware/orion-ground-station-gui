import { useContext } from 'react';
import { Router } from '../../../pages';
import { themeSetter } from '../../../shared/config/theme/themeSetter';
import style from './Mode.module.scss';
import { ThemeContext } from '../../../app/providers/ThemeProvider/ThemeProvider';
import { SatController } from '../../../widgets/SatController';


const Mode = ():JSX.Element => {

    const { theme } = useContext(ThemeContext) 

    let localStyles:React.CSSProperties = {
        ...themeSetter(theme),
        borderTop: 'unset',
        borderRight: 'unset',
        borderLeft: 'unset',
        borderBottom: 'unset'
    } 

    return(
        <div className={style.Mode} style={localStyles}>
            <Router/>
            <SatController/>
        </div>
    )
}

export { Mode }