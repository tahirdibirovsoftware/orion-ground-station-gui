import React, { FC, useContext } from 'react';
import style from './IoTView.module.scss';
import { ThemeContext } from '../../../app/providers/ThemeProvider/ThemeProvider';
import { themeSetter } from '../../../shared/config/theme/themeSetter';
import { IIOTView } from '../model/types';

const IoTView:FC<IIOTView> = ({iotData}):JSX.Element => {

    const {temperature, humidity} = iotData[iotData.length-1]

    const {theme} = useContext(ThemeContext)
    const localStyles:React.CSSProperties = {
        ...themeSetter(theme)
    }

    return(

        

        <div style={localStyles} className={style.IoTView}>
            <span>{temperature} &deg;C</span>
            <span>|</span>
            <span>{humidity}%</span>
        </div>
    )
}

export {IoTView}