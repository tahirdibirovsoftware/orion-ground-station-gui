import React, { useContext, useMemo } from 'react';
import { themeSetter } from '../../../shared/config/theme/model/themeSetter';
import style from './Ias.module.scss';
import { ThemeContext } from '../../../app/providers/ThemeProvider/ThemeProvider';
import { IIas } from '../model/types';

export const Ias: React.FC<IIas> = ({ errorCode }) => {
  const { theme } = useContext(ThemeContext);

  const processedErrorCode = useMemo(() => {
    if (!errorCode) return [];
    return String(errorCode)
      .split('')
      .map((code) => {
        const num = parseInt(code, 10);
        return isNaN(num) ? '' : num;
      });
  }, [errorCode]);

  const themeStyles = useMemo(() => themeSetter(theme), [theme]);

  return (
    <div className={style.Ias} style={themeStyles}>
      {processedErrorCode.map((binary, idx) => (
        <div
          key={idx}
          className={binary ? style.ErrorBox : style.SuccessBox}
        >
          {binary}
        </div>
      ))}
    </div>
  );
};

export const MemoizedIas = React.memo(Ias);