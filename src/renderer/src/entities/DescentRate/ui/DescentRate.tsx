import style from './DescentRate.module.scss';
import { FC, useContext } from 'react';
import { themeSetter } from '../../../shared/config/theme/themeSetter';
import { ThemeContext } from '../../../app/providers/ThemeProvider/ThemeProvider';
import { IDescentRate } from '../model/types';
import { Trans, useTranslation } from 'react-i18next';


const DescentRate:FC<IDescentRate> = ({flightData}):JSX.Element => {
    useTranslation()
    const descentRate = flightData[flightData.length-1].descentRate
    const isAvailable = flightData[flightData.length-1].packetNumber>0
    const { theme } = useContext(ThemeContext)

    const localStyles:React.CSSProperties = {
        ...themeSetter(theme)
    }

    return(
        <div style={localStyles} className={style.DescentRate}>
            {
                 isAvailable &&
                <span><Trans>DESCENT_RATE</Trans>: {descentRate}m/s</span>
            }
        </div>
    )
}

export {DescentRate}