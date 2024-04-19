import { ITerminal } from '../model'
import style from './Terminal.module.scss'
import { useTerminalSkin } from '../lib'


const Termninal = ({ data, mode }: ITerminal): JSX.Element => {


    console.log(data)

    return (
        <div style={useTerminalSkin()} className={`${style.Terminal} ${mode === 'preview' ? style.TerminalPreview : style.TerminalFull}`}>
            {
                data.map(data => (
                    <div key={data.packetNumber} className={style.tpDataPacket}>
                        <span >PACKET NUMBER: {data.packetNumber}</span>
                        <span  >SATELLITE STATUS: {data.satelliteStatus}</span>
                        <span  >ERROR CODE: {data.errorCode}</span>
                        <span >MISSION TIME: {JSON.stringify(data.missionTime)}</span>
                        <span  >PRESSURE 1: {data.pressure1}</span>
                        <span >PRESSURE 2: {data.pressure2}</span>
                        <span  >ALTITUDE 1: {data.altitude1}</span>
                        <span  >ALTITUDE 2: {data.altitude2}</span>
                        <span  >ALTITUDE DIFFERENCE: {data.altitudeDifference}</span>
                        <span  >DESCENT RATE: {data.descentRate}</span>
                        <span  >TEMP: {data.temp}</span>
                        <span  >VOLTAGE LEVEL: {data.voltageLevel}</span>
                        <span  >GPS 1 ALTITUDE: {data.gps1Altitude}</span>
                        <span  >GPS 1 LONGITUDE: {data.gps1Longitude}</span>
                        <span  >PITCH: {data.pitch}</span>
                        <span >ROLL: {data.roll}</span>
                        <span >YAW: {data.YAW}</span>
                        <span >IOT DATA: {JSON.stringify(data.iotData)}</span>
                        <span  >TEAM ID: {data.teamId}</span>
                    </div>
                ))
            }
        </div>
    )
}

export { Termninal }