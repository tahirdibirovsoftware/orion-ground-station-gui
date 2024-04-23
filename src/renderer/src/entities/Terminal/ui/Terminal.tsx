import { ITerminal } from '../model'
import style from './Terminal.module.scss'
import { useTerminalSkin } from '../lib'
import { useTerminalSwitcher } from '../lib/useTerminalSwitcher'
import { useLocation, useNavigate } from 'react-router-dom'


const Termninal = ({ data, mode }: ITerminal): JSX.Element => {
    const {pathname} = useLocation()
    const navigate = useNavigate()
    const switchTerminal  = (): void => useTerminalSwitcher(pathname, navigate)

    return (
        <div onClick={()=>switchTerminal()} style={useTerminalSkin()} className={`${style.Terminal} ${mode === 'preview' ? style.TerminalPreview : style.TerminalFull}`}>
            {
                data.map(data => (
                    <div key={data.packetNumber} className={style.tpDataPacket}>
                        <span >PAKET NUMARASI: {data.packetNumber}</span>
                        <span  >UYDU STATÜSÜ: {data.satelliteStatus}</span>
                        <span  >HATA KODU: {data.errorCode}</span>
                        <span >GÖNDERME SAATİ: {JSON.stringify(data.missionTime)}</span>
                        <span  >BASINÇ 1: {data.pressure1}</span>
                        <span >BASINÇ 2: {data.pressure2}</span>
                        <span  >YÜKSEKLİK 1: {data.altitude1}</span>
                        <span  >YÜKSEKLİK 2: {data.altitude2}</span>
                        <span  >İRTİFA FARKI: {data.altitudeDifference}</span>
                        <span  >İNİŞ HIZI: {data.descentRate}</span>
                        <span  >SICAKLIK: {data.temp}</span>
                        <span  >PİL GERİLİMİ: {data.voltageLevel}</span>
                        <span  >GPS 1 ALTITUDE: {data.gps1Altitude}</span>
                        <span  >GPS 1 LONGITUDE: {data.gps1Longitude}</span>
                        <span  >PITCH: {data.pitch}</span>
                        <span >ROLL: {data.roll}</span>
                        <span >YAW: {data.YAW}</span>
                        <span >IOT DATA: {JSON.stringify(data.iotData)}</span>
                        <span  >TAKIM NO: {data.teamId}</span>
                    </div>
                ))
            }
        </div>
    )
}

export { Termninal }