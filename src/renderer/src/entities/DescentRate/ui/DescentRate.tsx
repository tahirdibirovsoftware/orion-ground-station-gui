import React, { useContext, useMemo } from 'react';
import style from './DescentRate.module.scss';
import { themeSetter } from '../../../shared/config/theme/model/themeSetter';
import { ThemeContext } from '../../../app/providers/ThemeProvider/ThemeProvider';
import { IDescentRate } from '../model/types';
import { Trans, useTranslation } from 'react-i18next';

export const DescentRate: React.FC<IDescentRate> = ({ flightData }) => {
  const { t } = useTranslation();
  const { theme } = useContext(ThemeContext);

  const { descentRate, isAvailable } = useMemo(() => {
    const lastData = flightData[flightData.length - 1] || {};
    return {
      descentRate: lastData.descentRate,
      isAvailable: (lastData.packetNumber || 0) > 0
    };
  }, [flightData]);

  const localStyles = useMemo(() => themeSetter(theme), [theme]);

  return (
    <div style={localStyles} className={style.DescentRate}>
      {isAvailable && (
        <span>
          <Trans>{t('DESCENT_RATE')}</Trans>: {descentRate}m/s
        </span>
      )}
    </div>
  );
};