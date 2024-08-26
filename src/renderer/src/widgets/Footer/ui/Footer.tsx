import React, { useContext, useMemo } from 'react';
import style from './Footer.module.scss';
import teknofestLogoBlack from '../assets/teknofest-black.png';
import teknofestLogoWhite from '../assets/teknofest-white.png';
import { themeSetter } from '../../../shared/config/theme/model/themeSetter';
import { ThemeContext } from '../../../app/providers/ThemeProvider/ThemeProvider';
import { Logo } from '../../../entities/Logo';
import { BORDER_ONLY_LEFT, BORDER_ONLY_TOP } from '@renderer/shared/config/theme/constants';
import { setImageToTheme } from '@renderer/shared/config/theme/model/imageTheme';

const Footer: React.FC = React.memo(() => {
  const { theme } = useContext(ThemeContext);

  const localStyles = useMemo(() => ({
    ...themeSetter(theme, {...BORDER_ONLY_TOP, ...BORDER_ONLY_LEFT}),
  }), [theme]);

  const teknofestLogo = useMemo(() => 
    setImageToTheme(theme, teknofestLogoWhite, teknofestLogoBlack),
    [theme]
  );

  const currentYear = useMemo(() => new Date().getFullYear(), []);

  return (
    <footer style={localStyles} className={style.Footer}>
      <img 
        className={style.teknofestLogo} 
        src={teknofestLogo} 
        alt="Teknofest Logo"
      />
      <span className={style.naaLogo}>
        {'National Aviation Academy'.toUpperCase()}
      </span>
      <Logo size={3} title='Orion' />
      <span className={style.copy}>&copy; {currentYear}, Teknofest</span>
    </footer>
  );
});

Footer.displayName = 'Footer';

export { Footer };