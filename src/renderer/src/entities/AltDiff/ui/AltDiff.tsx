import { FC, useContext } from 'react';
import { themeSetter } from '../../../shared/config/theme/model/themeSetter';
import style from  './AltDiff.module.scss';
import { ThemeContext } from '../../../app/providers/ThemeProvider/ThemeProvider';
import { IAltDiff } from '../model/types';
import { Trans, useTranslation } from 'react-i18next';


const AltDiff:FC<IAltDiff> = ({flightData}):JSX.Element => {

    useTranslation()
    const altitudeDifference = flightData[flightData.length-1].altitudeDifference
    const isAvailable = flightData[flightData.length-1].packetNumber>0
    const { theme } = useContext(ThemeContext)

    const localStyles:React.CSSProperties = {
        ...themeSetter(theme)
    }

    return(
        <div style={localStyles} className={style.AltDiff}>
            {
                 isAvailable &&
                <span><Trans>ALTITUDE_DIFFERENCE</Trans>: {altitudeDifference}m</span>
            }
        </div>
    )
}

export {AltDiff}