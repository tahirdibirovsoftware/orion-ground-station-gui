import { FC, memo, useContext, useEffect, useRef } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import style from './Terminal.module.scss';
import { ThemeContext } from '../../../app/providers/ThemeProvider/ThemeProvider';
import { themeSetter } from '../../../shared/config/theme/model/themeSetter';
import { ITerminal } from '../model/types';
import { useLocation, useNavigate } from 'react-router-dom';
import { routeHandler } from '../lib/routeHandler';
import { filterToLastData } from '../lib/filterData';
import { ITelemetry } from 'src/global/types/types';
import { ALL_BORDERS } from '@renderer/shared/config/theme/constants';

const TerminalComponent: FC<ITerminal> = ({ mode = 'demo', flightData }): JSX.Element => {
    useTranslation()
    const navigate = useNavigate();
    const location = useLocation();
    const { theme } = useContext(ThemeContext);
    const terminalRef = useRef<HTMLDivElement>(null);

    const localeStyles: React.CSSProperties = {
        ...themeSetter(theme, ALL_BORDERS, [0, 5, 15, 0]),
        height: mode === 'demo' ? '20%' : '100%',
        overflowY: 'auto', // Add vertical scroll
    };

    const thLocaleStyle: React.CSSProperties = {
        ...themeSetter(theme, ALL_BORDERS, [10, 5, 15, 0]),
        borderTop: 'unset',
        borderLeft: 'unset',
    };

    const dataTypes = [
        'PACKET_NUMBER',
        'SATELLITE_STATUS',
        'ERROR_CODE',
        'MISSION_TIME',
        'PRESSURE1',
        'PRESSURE2',
        'ALTITUDE1',
        'ALTITUDE2',
        'ALTITUDE_DIFFERENCE',
        'DESCENT_RATE',
        'TEMP',
        'BATTERY_VOLTAGE',
        'GPS1_LATITUDE',
        'GPS1_LONGITUDE',
        'GPS1_ALTITUDE',
        'PITCH',
        'ROLL',
        'YAW',
        'LNLN',
        'IoT_DATA',
        'TEAM_NUMBER'
    ];

    useEffect(() => {
        if (terminalRef.current) {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
    }, [flightData]);

    return (
        <div
            onClick={() => routeHandler(location, navigate)}
            style={localeStyles}
            className={style.Terminal}
            ref={terminalRef}
        >
            <table>
                <thead className={style.TableHeader}>
                    <tr>
                        {dataTypes.map(dataType => (
                            <th key={dataType} style={thLocaleStyle}>
                                <Trans>{dataType}</Trans>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className={style.TableBody}>
                    {flightData[flightData?.length - 1].packetNumber > 0 &&
                        filterToLastData<ITelemetry>(flightData.slice(1), 29).map((data, index) => (
                            <tr key={`${data.packetNumber}-${index}`}>
                                <td style={thLocaleStyle}>{data.packetNumber}</td>
                                <td style={thLocaleStyle}>{data.satelliteStatus}</td>
                                <td style={thLocaleStyle}>{data.errorCode}</td>
                                <td style={thLocaleStyle}>{data.missionTime && data.missionTime.toLocaleString()}</td>
                                <td style={thLocaleStyle}>{data.pressure1}</td>
                                <td style={thLocaleStyle}>{data.pressure2}</td>
                                <td style={thLocaleStyle}>{data.altitude1}</td>
                                <td style={thLocaleStyle}>{data.altitude2}</td>
                                <td style={thLocaleStyle}>{data.altitudeDifference}</td>
                                <td style={thLocaleStyle}>{data.descentRate}</td>
                                <td style={thLocaleStyle}>{data.temp}</td>
                                <td style={thLocaleStyle}>{data.voltageLevel}</td>
                                <td style={thLocaleStyle}>{data.gps1Latitude}</td>
                                <td style={thLocaleStyle}>{data.gps1Longitude}</td>
                                <td style={thLocaleStyle}>{data.gps1Altitude}</td>
                                <td style={thLocaleStyle}>{data.pitch}</td>
                                <td style={thLocaleStyle}>{data.roll}</td>
                                <td style={thLocaleStyle}>{data.YAW}</td>
                                <td style={thLocaleStyle}>{data.LNLN}</td>
                                <td style={thLocaleStyle}>{String(data.iotData)}</td>
                                <td style={thLocaleStyle}>{data.teamId}</td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
};

export const Terminal = memo(TerminalComponent);