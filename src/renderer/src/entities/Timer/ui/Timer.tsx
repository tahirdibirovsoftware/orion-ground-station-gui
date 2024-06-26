import { FC, useContext } from 'react';
import style from './Timer.module.scss';
import { ITimer } from '../model/types';
import { ThemeContext } from '@renderer/app/providers/ThemeProvider/ThemeProvider';
import { themeSetter } from '@renderer/shared/config/theme/themeSetter';

const Timer:FC<ITimer> = ({flightData}):JSX.Element => {

    const gpsDate = flightData[flightData.length-1].missionTime
     const gpsArrayDate = typeof gpsDate ==='string' && gpsDate.split('/')

     const { theme } = useContext(ThemeContext)

    const localStyles:React.CSSProperties = {
        color: 'rgba(200,200,200,1)',
        ...themeSetter(theme)
    }


    return(
        <div style={localStyles} className={style.Timer}>
            { gpsDate &&
                <>
                <span>{parseInt(gpsArrayDate[3])<10 && '0'}{gpsArrayDate[3]}:</span>
                <span>{parseInt(gpsArrayDate[4])<10 && '0'}{gpsArrayDate[4]}:</span>
                <span>{parseInt(gpsArrayDate[5])<10 && '0'}{gpsArrayDate[5]}</span>
                </>
            }
        </div>
    )
}

export {Timer};