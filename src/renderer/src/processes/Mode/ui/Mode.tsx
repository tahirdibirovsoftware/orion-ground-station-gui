/* eslint-disable react/prop-types */
import React, { FC, useContext, useMemo } from 'react';
import { Router } from '../../../pages';
import { themeSetter } from '../../../shared/config/theme/model/themeSetter';
import style from './Mode.module.scss';
import { ThemeContext } from '../../../app/providers/ThemeProvider/ThemeProvider';
import { SatController } from '../../../widgets/SatController';
import { IMode } from '../model/types';

const Mode: FC<IMode> = React.memo(({ flightData, iotData }) => {
  const { theme } = useContext(ThemeContext);

  const localStyles = useMemo(() => ({
    ...themeSetter(theme),
    borderTop: 'unset',
    borderRight: 'unset',
    borderLeft: 'unset',
    borderBottom: 'unset'
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