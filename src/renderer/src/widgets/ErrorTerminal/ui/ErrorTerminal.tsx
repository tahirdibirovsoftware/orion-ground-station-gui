/* eslint-disable react/prop-types */
import React, { FC, useContext, useMemo, useCallback } from 'react';
import style from './Errorterminal.module.scss';
import { ThemeContext } from '../../../app/providers/ThemeProvider/ThemeProvider';
import { themeSetter } from '../../../shared/config/theme/model/themeSetter';
import { Error } from '../../../entities/Error';
import { IErrorTerminal } from '../model/types';
import { ALL_BORDERS } from '@renderer/shared/config/theme/constants';

const errorStatuses = [
  'CONTAINER_LANDING_RATE_FAILURE',
  'SCIENCE_PAYLOAD_LANDING_RATE_FAILURE',
  'CONTAINER_PRESSURE_DATA_FAILURE',
  'SCIENCE_PAYLOAD_POSITION_DATA_FAILURE',
  'RELEASE_FAILURE'
];

const ErrorTerminal: FC<IErrorTerminal> = React.memo(({ errorCode }) => {
  const { theme } = useContext(ThemeContext);

  const localStyles = useMemo(() => themeSetter(theme, ALL_BORDERS, [0,0,5,1]), [theme]);

  const processErrorCode = useCallback((code: string | number) => {
    if (typeof code !== 'string' && typeof code !== 'number') return [];
    return code.toString().split('').map(Number);
  }, []);

  const processedErrorCode = useMemo(() => processErrorCode(errorCode), [errorCode, processErrorCode]);

  return (
    <div style={localStyles} className={style.ErrorTerminal}>
      {processedErrorCode.map((code, idx) => 
        code === 1 && <Error key={errorStatuses[idx]} content={errorStatuses[idx]} />
      )}
    </div>
  );
});

ErrorTerminal.displayName = 'ErrorTerminal';

export { ErrorTerminal };