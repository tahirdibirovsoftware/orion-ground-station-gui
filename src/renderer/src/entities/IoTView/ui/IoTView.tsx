import React, { useContext } from 'react';
import style from './IoTView.module.scss';
import { ThemeContext } from '../../../app/providers/ThemeProvider/ThemeProvider';
import { themeSetter } from '../../../shared/config/theme/themeSetter';

const IoTView = ():JSX.Element => {

    const {theme} = useContext(ThemeContext)
    const localStyles:React.CSSProperties = {
        ...themeSetter(theme)
    }

    return(

        

        <div style={localStyles} className={style.IoTView}>
            <span>IoT Data</span>
        </div>
    )
}

export {IoTView}