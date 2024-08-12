import React, { useContext, useMemo } from 'react';
import { themeSetter } from '../../../shared/config/theme/model/themeSetter';
import style from './AltDiff.module.scss';
import { ThemeContext } from '../../../app/providers/ThemeProvider/ThemeProvider';
import { IAltDiff } from '../model/types';
import { Trans, useTranslation } from 'react-i18next';

const AltDiffComponent: React.FC<IAltDiff> = ({ flightData }) => {
  const { t } = useTranslation();
  const { theme } = useContext(ThemeContext);

  const { altitudeDifference, isAvailable } = useMemo(() => {
    const lastFlightData = flightData[flightData.length - 1] || {};
    return {
      altitudeDifference: lastFlightData.altitudeDifference,
      isAvailable: (lastFlightData.packetNumber || 0) > 0
    };
  }, [flightData]);

  const localStyles = useMemo(() => themeSetter(theme), [theme]);

  if (!isAvailable) {
    return null;
  }

  return (
    <div style={localStyles} className={style.AltDiff}>
      <span>
        <Trans>{t('ALTITUDE_DIFFERENCE')}</Trans>: {altitudeDifference}m
      </span>
    </div>
  );
};

export const AltDiff = React.memo(AltDiffComponent);