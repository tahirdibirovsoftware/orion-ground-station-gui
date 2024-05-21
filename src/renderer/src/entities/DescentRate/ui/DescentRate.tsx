import style from './DescentRate.module.scss';
import { FC, useContext } from 'react';
import { themeSetter } from '../../../shared/config/theme/themeSetter';
import { ThemeContext } from '../../../app/providers/ThemeProvider/ThemeProvider';
import { IDescentRate } from '../model/types';


const DescentRate:FC<IDescentRate> = ({flightData}):JSX.Element => {
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
                <span>Descent Rate: {descentRate}m/s</span>
            }
        </div>
    )
}

export {DescentRate}