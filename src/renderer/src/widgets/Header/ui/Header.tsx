import { StatusBar } from '@renderer/widgets/StatusBar';
import { Logo } from '../../../entities/Logo';
import { MenuToggler } from '../../../features/MenuToggler';
import { themeSetter } from '../../../shared/config/theme/model/themeSetter';
import style from './Header.module.scss';
import { FC, useContext } from 'react';
import { IHeader } from '../model/types';
import { LangToggler } from '@renderer/features/LangToggler';
import { ThemeToggler } from '@renderer/features/ThemeToggler';
import { ThemeContext } from '@renderer/app/providers/ThemeProvider/ThemeProvider';



const Header:FC<IHeader> = ({flightData}):JSX.Element => {


    const {theme} = useContext(ThemeContext)

    const localStyles: React.CSSProperties = {
        ...themeSetter(theme, {bb: false, bl: false, br: false, bt: false}),
    }

    console.log('Header styles:', localStyles)

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