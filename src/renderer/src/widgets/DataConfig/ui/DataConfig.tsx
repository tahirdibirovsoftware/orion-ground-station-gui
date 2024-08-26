/* eslint-disable react/prop-types */
import React, { FC, useContext, useMemo } from 'react';
import { themeSetter } from '../../../shared/config/theme/model/themeSetter';
import style from './DataConfig.module.scss';
import { ThemeContext } from '../../../app/providers/ThemeProvider/ThemeProvider';
import { IDataConfig } from '../model/types';
import { getTitle } from '../lib/getTitle';
import { PortConfig } from '../../../features/PortConfig';
import { BaudRateConfig } from '../../../features/BaudRateConfig';
import { Connector } from '../../../features/Connector';
import { Trans, useTranslation } from 'react-i18next';

const DataConfig: FC<IDataConfig> = React.memo(({ type }) => {
  const { theme } = useContext(ThemeContext);
  useTranslation(); // Note: This hook is called but not used. Consider removing if not needed.

  const localStyles = useMemo(() => ({
    ...themeSetter(theme),
    borderTop: 'unset',
    borderRight: 'unset',
    borderLeft: 'unset'
  }), [theme]);

  const title = useMemo(() => getTitle(type), [type]);

  return (
    <div className={style.DataConfig} style={localStyles}>
      <span className={style.title}>
        <Trans>{title}</Trans>
      </span>
      <PortConfig type={type} />
      <BaudRateConfig type={type} />
      <Connector type={type} />
    </div>
  );
});

DataConfig.displayName = 'DataConfig';

export { DataConfig };