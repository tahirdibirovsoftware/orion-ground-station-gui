import { FC, useContext } from 'react';
import { Router } from '../../../pages';
import { themeSetter } from '../../../shared/config/theme/themeSetter';
import style from './Mode.module.scss';
import { ThemeContext } from '../../../app/providers/ThemeProvider/ThemeProvider';
import { SatController } from '../../../widgets/SatController';
import { IMode } from '../model/types';


const Mode:FC<IMode> = ({flightData}):JSX.Element => {

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
            <Router flightData={flightData}/>
            <SatController data={flightData}/>
        </div>
    )
}

export { Mode }