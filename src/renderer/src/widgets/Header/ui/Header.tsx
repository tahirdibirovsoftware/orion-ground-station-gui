/* eslint-disable react/prop-types */
import React, { FC, useContext, useMemo } from 'react';
import { StatusBar } from '@renderer/widgets/StatusBar';
import { Logo } from '../../../entities/Logo';
import { MenuToggler } from '../../../features/MenuToggler';
import { themeSetter } from '../../../shared/config/theme/model/themeSetter';
import style from './Header.module.scss';
import { IHeader } from '../model/types';
import { LangToggler } from '@renderer/features/LangToggler';
import { ThemeToggler } from '@renderer/features/ThemeToggler';
import { ThemeContext } from '@renderer/app/providers/ThemeProvider/ThemeProvider';
import { HTTPStatus } from '@renderer/entities/HttpStatus';
import { BORDER_ONLY_BOTTOM } from '@renderer/shared/config/theme/constants';

const Header: FC<IHeader> = React.memo(({ flightData }) => {
  const { theme } = useContext(ThemeContext);

  const localStyles = useMemo(() =>
    themeSetter(theme, BORDER_ONLY_BOTTOM, [0, 10, 10, 1]),
    [theme]
  );

  return (
    <header style={localStyles} className={style.Header}>
      <MenuToggler />
      <Logo size={2} title='Orion' />
      <div className={style.HeaderWrapper}>
        <HTTPStatus />
        <LangToggler />
        <ThemeToggler />
        <StatusBar flightData={flightData} />
      </div>
    </header>
  );
});

Header.displayName = 'Header';

export { Header };