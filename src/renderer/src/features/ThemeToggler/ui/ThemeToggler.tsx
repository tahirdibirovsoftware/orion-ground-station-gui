import React, { useContext, useCallback } from 'react';
import { Switch } from 'antd';
import { MoonOutlined, SunOutlined } from '@ant-design/icons';
import { ThemeContext } from '../../../app/providers/ThemeProvider/ThemeProvider';
import { ThemeMode } from '../../../shared/config/theme/types';
import style from './ThemeToggler.module.scss';

const ThemeToggler: React.FC = () => {
    const { theme, setTheme } = useContext(ThemeContext);

    const toggleTheme = useCallback(() => {
        const newTheme: ThemeMode = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    }, [theme, setTheme]);

    return (
        <div className={style.ThemeToggler}>
            <Switch
                onChange={toggleTheme}
                checked={theme === 'light'}
                unCheckedChildren={<MoonOutlined />}
                checkedChildren={<SunOutlined />}
            />
        </div>
    );
};

export { ThemeToggler };