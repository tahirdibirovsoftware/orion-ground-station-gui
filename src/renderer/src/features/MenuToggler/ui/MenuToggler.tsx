import React, { useContext, useMemo, useCallback } from 'react';
import { ArrowLeftOutlined, MenuOutlined } from '@ant-design/icons';
import style from './MenuToggler.module.scss';
import { themeSetter } from '../../../shared/config/theme/model/themeSetter';
import { ThemeContext } from '../../../app/providers/ThemeProvider/ThemeProvider';
import { useAppDispatch, useAppSelector } from '../../../app/redux/hooks';
import { toggleMenu } from '../model/slices/menuSlice';
import { IMenuToggler } from '../model/slices/types';
import { setBorder } from '../model/slices/borderSetter';

const MenuToggler: React.FC<IMenuToggler> = ({ styleOverride }) => {
    const { theme } = useContext(ThemeContext);
    const dispatch = useAppDispatch();
    const { isActive } = useAppSelector(state => state.menuReducer);

    const handleToggle = useCallback(() => {
        dispatch(toggleMenu());
    }, [dispatch]);

    const localStyles = useMemo(() => {
        const baseStyles = themeSetter(theme, setBorder(isActive));
        return styleOverride ? { ...baseStyles, ...styleOverride } : baseStyles;
    }, [theme, isActive, styleOverride]);

    const IconComponent = isActive ? ArrowLeftOutlined : MenuOutlined;

    return (
        <div onClick={handleToggle} style={localStyles} className={style.MenuToggler}>
            <IconComponent className={style.Icon} style={{ fontSize: '1.5rem' }} />
        </div>
    );
};

export { MenuToggler };