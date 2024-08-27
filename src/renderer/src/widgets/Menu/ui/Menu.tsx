import React, { useContext, useMemo } from 'react';
import { themeSetter } from '../../../shared/config/theme/model/themeSetter';
import style from './Menu.module.scss';
import { ThemeContext } from '../../../app/providers/ThemeProvider/ThemeProvider';
import { PageSwitcher } from '../../../features/PageSwitcher';
import { MenuToggler } from '../../../features/MenuToggler';
import { DataConfig } from '../../DataConfig';
import { FileManager } from '../../../features/FileManager';
import { Footer } from '../../Footer';
import { ALL_BORDERS } from '@renderer/shared/config/theme/constants';

const Menu: React.FC = React.memo(() => {
  const { theme } = useContext(ThemeContext);

  const themeStyles = useMemo(() => themeSetter(theme, ALL_BORDERS, [10,5,15,0]), [theme]);

  return (
    <div style={themeStyles} className={style.Menu}>
      <MenuToggler />
      <PageSwitcher 
        path='flight' 
        title='flight_mode' 
        styleOverride={{marginTop: '.5rem'}}
      />
      <PageSwitcher path='terminal' title='terminal_mode' />
      <DataConfig type='flight' />
      <DataConfig type='iot' />
      <FileManager />
      <Footer />
    </div>
  );
});

Menu.displayName = 'Menu';

export { Menu };