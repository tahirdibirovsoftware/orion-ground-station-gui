/* eslint-disable react/prop-types */
import React, { FC, useContext, useMemo } from 'react';
import { Router } from '../../../pages';
import { themeSetter } from '../../../shared/config/theme/model/themeSetter';
import style from './Mode.module.scss';
import { ThemeContext } from '../../../app/providers/ThemeProvider/ThemeProvider';
import { SatController } from '../../../widgets/SatController';
import { IMode } from '../model/types';
import { NO_BORDER } from '@renderer/shared/config/theme/constants';

const Mode: FC<IMode> = React.memo(({ flightData, iotData }) => {
  const { theme } = useContext(ThemeContext);

  const localStyles = useMemo(() => ({
    ...themeSetter(theme, NO_BORDER)
  }), [theme]);

  return (
    <div className={style.Mode} style={localStyles}>
      <Router iotData={iotData} flightData={flightData} />
      <SatController flightData={flightData} iotData={iotData} />
    </div>
  );
});

Mode.displayName = 'Mode';

export { Mode };