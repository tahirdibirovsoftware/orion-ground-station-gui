import { FC, useContext, useEffect, useRef } from 'react';
import style from './Terminal.module.scss';
import { ThemeContext } from '../../../app/providers/ThemeProvider/ThemeProvider';
import { themeSetter } from '../../../shared/config/theme/themeSetter';
import { ITerminal } from '../model/types';
import { useLocation, useNavigate } from 'react-router-dom';
import { routeHandler } from '../lib/routeHandler';
import { filterToLastData } from '../lib/filterData';
import { ITelemetry } from 'src/global/types/types';

const Terminal: FC<ITerminal> = ({ mode = 'demo', flightData }): JSX.Element => {
    const navigate = useNavigate();
    const location = useLocation();
    const { theme } = useContext(ThemeContext);
    const terminalRef = useRef<HTMLDivElement>(null);

    const localeStyles: React.CSSProperties = {
        ...themeSetter(theme),
        height: mode === 'demo' ? '20%' : '100%',
        overflowY: 'auto', // Add vertical scroll
    };

    const thLocaleStyle: React.CSSProperties = {
        ...themeSetter(theme),
        borderTop: 'unset',
        borderLeft: 'unset',
    };

    const dataTypes = [
        'PACKET NUMBER',
        'SATELLITE STATUS',
        'ERROR CODE',
        'MISSION TIME (DD/MM/YYYY/HH/MM/SS)',
        'PRESSURE1 (hPa)',
        'PRESSURE2 (hPa)',
        'ALTITUDE1 (m)',
        'ALTITUDE2 (m)',
        'ALTITUDE DIFFERENCE (m)',
        'DESCENT RATE (m/s)',
        'TEMP (°C)',
        'BATTERY V',
        'GPS1 LATITUDE',
        'GPS1 LONGITUDE',
        'GPS1 ALTITUDE',
        'PITCH°',
        'ROLL°',
        'YAW°',
        'LNLN',
        'IoT DATA (°C)',
        'TEAM NUMBER'
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
                <thead>
                    <tr>
                        {dataTypes.map(dataType => (
                            <th key={dataType} style={thLocaleStyle}>
                                {dataType}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {flightData[flightData?.length - 1].packetNumber > 0 &&
                        filterToLastData<ITelemetry>(flightData.slice(1), 100).map(data => (
                            <tr key={data.packetNumber}>
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

export { Terminal };
