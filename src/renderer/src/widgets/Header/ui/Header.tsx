import { StatusBar } from '@renderer/widgets/StatusBar';
import { Logo } from '../../../entities/Logo';
import { MenuToggler } from '../../../features/MenuToggler';
import { themeSetter } from '../../../shared/config/theme/themeSetter';
import style from './Header.module.scss';
import { FC } from 'react';
import { IHeader } from '../model/types';
import { LangToggler } from '@renderer/features/LangToggler';
import { ThemeToggler } from '@renderer/features/ThemeToggler';

const localStyles: React.CSSProperties = {
    ...themeSetter('dark'),
    borderTop: 'unset',
    borderRight: 'unset',
    borderLeft: 'unset',
}

const Header:FC<IHeader> = ({flightData}):JSX.Element => {
    return(
        <div style={localStyles} className={style.Header}>
            <MenuToggler/>
            <Logo size={2} title='Orion'/>
            <div className={style.HeaderWrapper}>
                <LangToggler></LangToggler>
                <ThemeToggler/>
            <StatusBar flightData={flightData}/>
            </div>
        </div>
    )
}

export {Header}