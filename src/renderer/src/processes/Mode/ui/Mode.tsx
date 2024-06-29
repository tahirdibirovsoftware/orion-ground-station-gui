import { FC, useContext } from 'react';
import { Router } from '../../../pages';
import { themeSetter } from '../../../shared/config/theme/model/themeSetter';
import style from './Mode.module.scss';
import { ThemeContext } from '../../../app/providers/ThemeProvider/ThemeProvider';
import { SatController } from '../../../widgets/SatController';
import { IMode } from '../model/types';


const Mode:FC<IMode> = ({flightData, iotData}):JSX.Element => {

    const { theme } = useContext(ThemeContext) 

    const localStyles:React.CSSProperties = {
        ...themeSetter(theme),
        borderTop: 'unset',
        borderRight: 'unset',
        borderLeft: 'unset',
        borderBottom: 'unset'
    } 

    return(
        <div className={style.Mode} style={localStyles}>
            <Router iotData={iotData} flightData={flightData}/>
            <SatController flightData={flightData} iotData={iotData}/>
        </div>
    )
}

export { Mode }