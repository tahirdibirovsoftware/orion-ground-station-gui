import { FC, useContext } from 'react';
import style from './Terminal.module.scss';
import { ThemeContext } from '../../../app/providers/ThemeProvider/ThemeProvider';
import { themeSetter } from '../../../shared/config/theme/themeSetter';
import { ITerminal } from '../model/types';
import { useLocation, useNavigate } from 'react-router-dom';
import { routeHandler } from '../lib/routeHandler';


const Terminal:FC<ITerminal> = ({mode='demo'}):JSX.Element => {

    const navigate = useNavigate()
    const location = useLocation()

    const { theme } = useContext(ThemeContext)
    const localeStyles:React.CSSProperties = {
        ...themeSetter(theme),
        height: mode==='demo' ? '20%' : '100%'
    }

    const thLocaleStyle:React.CSSProperties = {
        ...themeSetter(theme),
        borderTop: 'unset',
        borderLeft: 'unset'
    }

    const dataTypes = [
        'PACKET NUMBER',
        'SATELLITE STATUS',
        'ERROR CODE',
        'MISSION TIME',
        'PRESSURE1',
        'PRESSURE2',
        'ALTITUDE1',
        'ALTITUDE2',
        'DESCENT RATE',
        'TEMP',
        'BATTERY',
        'GPS1 LATITUDE',
        'GPS1 LONGITUDE',
        'GPS1 ALTITUDE',
        'PITCH',
        'ROLL',
        'YAW',
        'LNLN',
        'IoT DATA',
        'TEAM NUMBER'
    ]

    return(
        <div onClick={()=>routeHandler(location, navigate)} style={localeStyles} className={style.Terminal}>
            <table>
                <tr >
                   {
                    dataTypes.map(dataType=><th style={thLocaleStyle

                    }>{dataType}</th>)
                   }
                </tr>
            </table>
        </div>
    )
}

export {Terminal}