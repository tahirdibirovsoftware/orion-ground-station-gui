import { useContext } from 'react';
import { themeSetter } from '../../../shared/config/theme/themeSetter';
import style from './Menu.module.scss';
import { ThemeContext } from '../../../app/providers/ThemeProvider/ThemeProvider';
import { PageSwitcher } from '../../../features/PageSwitcher';
import { MenuToggler } from '../../../features/MenuToggler';
import { DataConfig } from '../../DataConfig';
import { FileManager } from '../../../features/FileManager';
import { Footer } from '../../Footer';


const Menu = ():JSX.Element => {

    const {theme} = useContext(ThemeContext)

    return(
        <div style={themeSetter(theme)} className={style.Menu}>
            <MenuToggler styleOverride={{border: 'unset', marginBottom: '3%'}}></MenuToggler>
            <PageSwitcher path='flight' title='flight Mode' styleOverride={{marginTop: '.5rem'}}/>
            <PageSwitcher path='terminal' title='terminal mode' styleOverride={{borderTop: 'unset'}}/>
            <DataConfig type='flight'/>
            <DataConfig type='iot'/>
            <FileManager/>
            <Footer/>
        </div>
    )
}

export { Menu }