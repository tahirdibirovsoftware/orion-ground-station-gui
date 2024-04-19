import { ITerminal } from '../model'
import style from './Terminal.module.scss'
import { useTerminalSkin } from '../lib'


const Termninal = ({data, mode}:ITerminal):JSX.Element=>{


    console.log(data)

    return(
        <div style={useTerminalSkin()} className={`${style.Terminal} ${mode==='preview' ? style.TerminalPreview : style.TerminalFull}`}>
            {
                data.map(data=>(
               <div key={data.packetNumber} className={style.tpDataPacket}>
                <span className={style.data}>PACKET NUMBER: {data.packetNumber}</span>
                <span  className={style.data}>SATELLITE STATUS: {data.satelliteStatus}</span>
                <span  className={style.data}>ERROR CODE: {data.errorCode}</span>
                <span  className={style.data}>MISSION TIME: {JSON.stringify(data.missionTime)}</span>
                <span  className={style.data}>PRESSURE 1: {data.pressure1}</span>
                <span  className={style.data}>PRESSURE 2: {data.pressure2}</span>
                <span  className={style.data}>ALTITUDE 1: {data.altitude1}</span>
                <span  className={style.data}>ALTITUDE 2: {data.altitude2}</span>
                <span  className={style.data}>ALTITUDE DIFFERENCE: {data.altitudeDifference}</span>
                <span  className={style.data}>DESCENT RATE: {data.descentRate}</span>
                <span  className={style.data}>TEMP: {data.temp}</span>
                <span  className={style.data}>VOLTAGE LEVEL: {data.voltageLevel}</span>
                <span  className={style.data}>GPS 1 ALTITUDE: {data.gps1Altitude}</span>
                <span  className={style.data}>GPS 1 LONGITUDE: {data.gps1Longitude}</span>
                <span  className={style.data}>PITCH: {data.pitch}</span>
                <span  className={style.data}>ROLL: {data.roll}</span>
                <span  className={style.data}>IOT DATA: {JSON.stringify(data.iotData)}</span>
                <span  className={style.data}>TEAM ID: {data.teamId}</span>
                <hr />
               </div>
            ))
            }
        </div>
    )
}

export {Termninal}