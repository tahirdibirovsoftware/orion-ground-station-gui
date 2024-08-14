import React, { useContext, useMemo } from 'react';
import { themeSetter } from '../../../shared/config/theme/model/themeSetter';
import style from './Logo.module.scss';
import { ILogo } from '../model/types';
import { ThemeContext } from '@renderer/app/providers/ThemeProvider/ThemeProvider';

const LogoComponent: React.FC<ILogo> = ({ title, size }) => {
  const { theme } = useContext(ThemeContext);

  const localStyles = useMemo(() => ({
    color: themeSetter(theme).color,
    fontSize: `${size}rem`
  }), [theme, size]);

  return (
    <span style={localStyles} className={style.Logo}>
      {title}
      <span>&trade;</span>
    </span>
  );
};

export const Logo = React.memo(LogoComponent);