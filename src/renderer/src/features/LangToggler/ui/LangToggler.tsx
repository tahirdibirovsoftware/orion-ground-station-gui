import React, { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Switch } from 'antd';
import style from './LangToggler.module.scss';

const LangToggler: React.FC = () => {
    const { i18n } = useTranslation();
    
    const toggleLanguage = useCallback((checked: boolean): void => {
        const newLanguage = checked ? 'tr' : 'en';
        i18n.changeLanguage(newLanguage);
    }, [i18n]);
    
    const isChecked = useMemo(() => i18n.language === 'tr', [i18n.language]);
    const languageLabel = useMemo(() => isChecked ? 'Türkçe' : 'English', [isChecked]);
    
    return (
        <div className={style.LangToggler}>
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