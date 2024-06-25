import { useTranslation } from 'react-i18next';
import { Switch } from 'antd';
import style from './LangToggler.module.scss';

const LangToggler = (): JSX.Element => {
    const { i18n } = useTranslation();

    const toggleLanguage = (checked: boolean):void => {
        const newLanguage = checked ? 'tr' : 'en';
        i18n.changeLanguage(newLanguage);
    };

    return (
        <div className={style.LangToggler}>
            <span>{i18n.language === 'en' ? 'English' : 'Türkçe'}</span>
            <Switch
                checked={i18n.language === 'tr'}
                onChange={toggleLanguage}
                checkedChildren="TR"
                unCheckedChildren="EN"
            />
        </div>
    );
};

export { LangToggler };
