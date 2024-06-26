import { FC, useContext } from 'react';
import { themeSetter } from '../../../shared/config/theme/themeSetter';
import style from './Logo.module.scss';
import { ILogo } from '../model/types';
import { ThemeContext } from '@renderer/app/providers/ThemeProvider/ThemeProvider';


const Logo:FC<ILogo> = ({title, size}):JSX.Element => {

    const { theme } = useContext(ThemeContext)

    const localStyles:React.CSSProperties = {
        color: themeSetter(theme).color
    }
    

    return(
        <span style={{...localStyles, fontSize: `${size}rem`}} className={style.Logo}>
            {title}
            <span>&trade;</span>
        </span>
    )
}

export {Logo};