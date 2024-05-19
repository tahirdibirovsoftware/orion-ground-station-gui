import React, { FC, useContext } from 'react';
import style from './SatStatus.module.scss';
import { ThemeContext } from '../../../app/providers/ThemeProvider/ThemeProvider';
import { themeSetter } from '../../../shared/config/theme/themeSetter';
import { ISatStatus } from '../model/types';


const SatStatus:FC<ISatStatus> = ({satStatus}):JSX.Element => {

    
    const { theme } = useContext(ThemeContext)

    const localStyles:React.CSSProperties = {
        ...themeSetter(theme)        
    }

    const satStatuses = [
        'Ready to Flight',
        'Ascent',
        'Model Satellite Descent',
        'Release',
        'Science Payload Descent',
        'Recovery'
    ]

    return(
        <div style={localStyles} className={style.SatStatus}>
            <span>{satStatuses[satStatus]}</span>
        </div>
    )
}

export {SatStatus}