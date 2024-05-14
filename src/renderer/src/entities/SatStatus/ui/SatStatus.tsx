import React, { useContext } from 'react';
import style from './SatStatus.module.scss';
import { ThemeContext } from '../../../app/providers/ThemeProvider/ThemeProvider';
import { themeSetter } from '../../../shared/config/theme/themeSetter';


const SatStatus = ():JSX.Element => {


    const { theme } = useContext(ThemeContext)

    const localStyles:React.CSSProperties = {
        ...themeSetter(theme)        
    }


    return(
        <div style={localStyles} className={style.SatStatus}>
            <span>Sattelite Status</span>
        </div>
    )
}

export {SatStatus}