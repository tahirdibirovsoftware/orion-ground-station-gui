import { FC } from 'react';
import { themeSetter } from '../../../shared/config/theme/themeSetter';
import style from './Logo.module.scss';
import { ILogo } from '../model/types';

const localStyles:React.CSSProperties = {
    color: themeSetter('dark').color
}

const Logo:FC<ILogo> = ({title, size}):JSX.Element => {
    return(
        <span style={{...localStyles, fontSize: `${size}rem`}} className={style.Logo}>
            {title}
            <span>&trade;</span>
        </span>
    )
}

export {Logo};