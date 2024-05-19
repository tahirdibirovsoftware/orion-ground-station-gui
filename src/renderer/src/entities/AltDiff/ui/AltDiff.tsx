import { FC, useContext } from 'react';
import { themeSetter } from '../../../shared/config/theme/themeSetter';
import style from  './AltDiff.module.scss';
import { ThemeContext } from '../../../app/providers/ThemeProvider/ThemeProvider';
import { IAltDiff } from '../model/types';


const AltDiff:FC<IAltDiff> = ({altitudeDifference}):JSX.Element => {

    const { theme } = useContext(ThemeContext)

    const localStyles:React.CSSProperties = {
        ...themeSetter(theme)
    }

    return(
        <div style={localStyles} className={style.AltDiff}>
            <span>Altidtude Difference: {altitudeDifference}</span>
        </div>
    )
}

export {AltDiff}