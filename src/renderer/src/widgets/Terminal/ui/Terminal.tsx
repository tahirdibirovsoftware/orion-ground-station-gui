import { FC, useContext } from 'react';
import style from './Terminal.module.scss';
import { ThemeContext } from '../../../app/providers/ThemeProvider/ThemeProvider';
import { themeSetter } from '../../../shared/config/theme/themeSetter';
import { ITerminal } from '../model/types';
import { useLocation, useNavigate } from 'react-router-dom';
import { routeHandler } from '../lib/routeHandler';


const Terminal: FC<ITerminal> = ({ mode = 'demo', flightData }): JSX.Element => {

    const navigate = useNavigate()
    const location = useLocation()

    const { theme } = useContext(ThemeContext)
    const localeStyles: React.CSSProperties = {
        ...themeSetter(theme),
        height: mode === 'demo' ? '20%' : '100%'
    }

    const thLocaleStyle: React.CSSProperties = {
        ...themeSetter(theme),
        borderTop: 'unset',
        borderLeft: 'unset'
    }

    const dataTypes = [
        'PACKET NUMBER',
        'SATELLITE STATUS',
        'ERROR CODE',
        'MISSION TIME',
        'PRESSURE1',
        'PRESSURE2',
        'ALTITUDE1',
        'ALTITUDE2',
        'DESCENT RATE',
        'TEMP',
        'BATTERY',
        'GPS1 LATITUDE',
        'GPS1 LONGITUDE',
        'GPS1 ALTITUDE',
        'PITCH',
        'ROLL',
        'YAW',
        'LNLN',
        'IoT DATA',
        'TEAM NUMBER'
    ]

    return (
        <div onClick={() => routeHandler(location, navigate)} style={localeStyles} className={style.Terminal}>
            <table>
                <thead>
                <tr >
                    {
                        dataTypes.map(dataType => <th key={dataType} style={thLocaleStyle

                        }>{dataType}</th>)
                    }
                </tr>
                </thead>
                <tbody>
                {
                  (flightData[flightData?.length-1].packetNumber>0) && flightData.slice(1).map(data=>(
                        <tr key={data.packetNumber}>
                        <td>{data.packetNumber}</td>
                        <td>{data.satelliteStatus}</td>
                        <td>{data.errorCode}</td>
                        <td>{data.missionTime && data.missionTime.toLocaleString()}</td>
                        <td>{data.pressure1}</td>
                        <td>{data.pressure2}</td>
                        <td>{data.altitude1}</td>
                        <td>{data.altitude2}</td>
                        <td>{data.descentRate}</td>
                        <td>{data.temp}</td>
                        <td>{data.voltageLevel}</td>
                        <td>{data.gps1Altitude}</td>
                        <td>{data.gps1Longitude}</td>
                        <td>{data.gps1Altitude}</td>
                        <td>{data.pitch}</td>
                        <td>{data.roll}</td>
                        <td>{data.YAW}</td>
                        <td>{data.LNLN}</td>
                        <td>{String(data.iotData)}</td>
                        <td>{data.teamId}</td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </div>
    )
}

export { Terminal }