import React, { FC, useContext } from 'react';
import style from './SatStatus.module.scss';
import { ThemeContext } from '../../../app/providers/ThemeProvider/ThemeProvider';
import { themeSetter } from '../../../shared/config/theme/themeSetter';
import { ISatStatus } from '../model/types';
import { Trans, useTranslation } from 'react-i18next';


const SatStatus: FC<ISatStatus> = ({ flightData }): JSX.Element => {
    useTranslation()
    const satStatus = flightData[flightData.length - 1].satelliteStatus
    const isAvailable = Boolean(flightData[flightData.length - 1].packetNumber)
    const { theme } = useContext(ThemeContext)

    const localStyles: React.CSSProperties = {
        ...themeSetter(theme)
    }

    const satStatuses = [
        "READY_TO_FLIGHT",
        "ASCENT",
        "MODEL_SATELLITE_DESCENT",
        "RELEASE",
        "SCIENCE_PAYLOAD_DESCENT",
        "RECOVERY"
    ]

    return (
        <div style={localStyles} className={style.SatStatus}>
            <span>{isAvailable && <Trans>{satStatuses[satStatus]?.toUpperCase()}</Trans>}</span>
        </div>
    )
}

export { SatStatus }