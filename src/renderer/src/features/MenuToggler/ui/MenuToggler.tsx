import { ArrowLeftOutlined, MenuOutlined } from '@ant-design/icons';
import style from './MenuToggler.module.scss';
import { themeSetter } from '../../../shared/config/theme/themeSetter';
import { FC, useContext } from 'react';
import { ThemeContext } from '../../../app/providers/ThemeProvider/ThemeProvider';
import { useAppDispatch, useAppSelector } from '../../../app/redux/hooks';
import { toggleMenu } from '../model/slices/menuSlice';
import { IMenuToggler } from '../model/slices/types';

const MenuToggler:FC<IMenuToggler> = ({styleOverride}):JSX.Element=>{
    
    const {theme} = useContext(ThemeContext)
    const dispatch = useAppDispatch()
    const store = useAppSelector(state=>state.menuReducer)
    console.log(store)

    let localStyles:React.CSSProperties = {
        ...themeSetter(theme),
        
    }

    styleOverride ? localStyles = {...localStyles, ...styleOverride}: localStyles

    return(
        <div onClick={()=>dispatch(toggleMenu())} style={localStyles} className={style.MenuToggler}>
        {!store.isActive ? <MenuOutlined className={style.Icon} style={{fontSize: '1.5rem'}}/>:
        <ArrowLeftOutlined className={style.Icon} style={{fontSize: '1.5rem'}}/>
        }
        </div>
    )
}

export {MenuToggler}