import { useContext } from 'react';
import style from './ObjectTracker.module.scss';
import { ThemeContext } from '@renderer/app/providers/ThemeProvider/ThemeProvider';
import { themeSetter } from '@renderer/shared/config/theme/themeSetter';


export const ObjectTracker = ():JSX.Element => {

    const {theme} = useContext(ThemeContext)


    const localStyles:React.CSSProperties = {
        ...themeSetter(theme)
    } 


    return(
        <div style={localStyles} className={style.ObjectTracker}>

        </div>
    )
}