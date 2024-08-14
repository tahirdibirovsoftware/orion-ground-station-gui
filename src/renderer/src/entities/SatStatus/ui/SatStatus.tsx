/* eslint-disable react/prop-types */
import React, { useContext, useMemo } from 'react';
import style from './SatStatus.module.scss';
import { ThemeContext } from '../../../app/providers/ThemeProvider/ThemeProvider';
import { themeSetter } from '../../../shared/config/theme/model/themeSetter';
import { ISatStatus } from '../model/types';
import { Trans, useTranslation } from 'react-i18next';

const satStatuses = [
  "READY_TO_FLIGHT",
  "ASCENT",
  "MODEL_SATELLITE_DESCENT",
  "RELEASE",
  "SCIENCE_PAYLOAD_DESCENT",
  "RECOVERY"
] as const;

type SatStatusType = typeof satStatuses[number];

export const SatStatus: React.FC<ISatStatus> = React.memo(({ flightData }) => {
  const { t } = useTranslation();
  const { theme } = useContext(ThemeContext);

  const { satStatus, isAvailable } = useMemo(() => {
    const lastData = flightData[flightData.length - 1] || {};
    return {
      satStatus: lastData.satelliteStatus as number,
      isAvailable: Boolean(lastData.packetNumber)
    };
  }, [flightData]);

  const localStyles = useMemo(() => themeSetter(theme || 'light'), [theme]);

  const currentStatus = useMemo(() => {
    if (!isAvailable || satStatus === undefined || satStatus < 0 || satStatus >= satStatuses.length) {
      return null;
    }
    return satStatuses[satStatus] as SatStatusType;
  }, [isAvailable, satStatus]);

  if (!currentStatus) {
    return <div style={localStyles} className={style.SatStatus} />;
  }

  return (
    <div style={localStyles} className={style.SatStatus}>
      <span>
        <Trans>{t(currentStatus.toUpperCase())}</Trans>
      </span>
    </div>
  );
});

SatStatus.displayName = 'SatStatus';