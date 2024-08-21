import React, { useContext, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Trans, useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import style from './PageSwitcher.module.scss';
import { ThemeContext } from '../../../app/providers/ThemeProvider/ThemeProvider';
import { themeSetter } from '../../../shared/config/theme/model/themeSetter';
import { BORDER_ONLY_BOTTOM, BORDER__ONLY_TOP_BOTTOM, NO_BORDER } from '@renderer/shared/config/theme/constants';

interface IPageSwitcher {
    path: string;
    title: string;
    styleOverride?: React.CSSProperties;
}

const PageSwitcher: React.FC<IPageSwitcher> = React.memo(({ path, title, styleOverride }) => {
    useTranslation();
    const { theme } = useContext(ThemeContext);

    const localLinkStyles = useMemo(() => themeSetter(theme, NO_BORDER), [theme]);

    const localElementStyles = useMemo(() => {
        const baseStyles = themeSetter(theme,
            title.toUpperCase() === 'FLIGHT_MODE' ? BORDER__ONLY_TOP_BOTTOM : BORDER_ONLY_BOTTOM
        );
        return styleOverride ? { ...baseStyles, ...styleOverride } : baseStyles;
    }, [theme, title, styleOverride]);

    return (
        <div style={localElementStyles} className={style.PageSwitcher}>
            <Link style={localLinkStyles} className={style.Link} to={`/${path}`}>
                <Trans>{title.toUpperCase()}</Trans>
            </Link>
        </div>
    );
});

PageSwitcher.displayName = 'PageSwitcher';

PageSwitcher.propTypes = {
    path: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    styleOverride: PropTypes.object
};

export { PageSwitcher };