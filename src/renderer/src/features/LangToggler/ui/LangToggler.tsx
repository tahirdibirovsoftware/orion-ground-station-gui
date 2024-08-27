import React, { useCallback, useContext, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Switch } from 'antd';
import style from './LangToggler.module.scss';
import { themeSetter } from '@renderer/shared/config/theme/model/themeSetter';
import { ThemeContext } from '@renderer/app/providers/ThemeProvider/ThemeProvider';
import { NO_BORDER } from '@renderer/shared/config/theme/constants';

const LangToggler: React.FC = () => {
    const { i18n } = useTranslation();
    const { theme } = useContext(ThemeContext);
    
    const toggleLanguage = useCallback((checked: boolean): void => {
        const newLanguage = checked ? 'tr' : 'en';
        i18n.changeLanguage(newLanguage);
    }, [i18n]);
    
    const isChecked = useMemo(() => i18n.language === 'tr', [i18n.language]);
    const languageLabel = useMemo(() => isChecked ? 'Türkçe' : 'English', [isChecked]);
    
    const localStyles = useMemo(() => {
        const baseStyles = themeSetter(theme, NO_BORDER);
        return {
            ...baseStyles,
            '--theme-bg-color': theme === 'dark' ? '#1a1a1a' : '#ffffff',
            '--theme-text-color': theme === 'dark' ? '#ffffff' : '#000000',
            '--theme-switch-bg': theme === 'dark' ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.25)',
            '--theme-switch-color': theme === 'dark' ? '#ffffff' : '#000000',
        };
    }, [theme]);

    return (
        <div className={style.LangToggler} style={localStyles}>
            <span className={style.label}>{languageLabel}</span>
            <Switch
                checked={isChecked}
                onChange={toggleLanguage}
                checkedChildren="TR"
                unCheckedChildren="EN"
                className={style.switch}
            />
        </div>
    );
};

export { LangToggler };