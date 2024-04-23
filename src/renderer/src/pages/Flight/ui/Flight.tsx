import { Chart } from '@renderer/entities/Chart/ui/Chart'
import style from './Flight.module.scss'
import { Camera } from '@renderer/entities/Camera/ui/Camera/Camera'
import { Termninal } from '@renderer/entities/Terminal/ui/Terminal'
import { useMockDataFlow } from '@renderer/entities/Terminal/lib'
import { Ias } from '@renderer/entities/Ias/ui/Ias'
import { Mfm } from '@renderer/features/Mfm/ui/Mfm'
import { useEffect, useState } from 'react'
import { ParachuteControl } from '@renderer/features/Mfm/ui/ParachuteControl'
import { Map } from '@renderer/entities/Map'
import { Payload } from '@renderer/entities/Payload'
import { AltitudeDiff } from '@renderer/entities/AltitudeDif'


const Flight = (): JSX.Element => {
    const [tempData, setTempData] = useState<Array<number>>([])
    const [pressure1Data, setPressure1Data] = useState<Array<number>>([])
    const [pressure2Data, setPressure2Data] = useState<Array<number>>([])
    const [voltageData, setVoltageData] = useState<Array<number>>([])
    const [descentRate, setDescentRate] = useState<Array<number>>([])
    const [altitude1, setAltitude1] = useState<Array<number>>([])
    const [altitude2, setAltitude2] = useState<Array<number>>([])
    const [altitudeDifference, setAltitudeDifference] = useState<Array<number>>([])
    const mockTempData = useMockDataFlow().map(packet => packet.temp)
    const mockPressure1Data = useMockDataFlow().map(packet => packet.pressure1)
    const mockPressure2Data = useMockDataFlow().map(packet => packet.pressure2)
    const mockVoltageData = useMockDataFlow().map(packet => packet.voltageLevel)
    const mockDescentRate = useMockDataFlow().map(packet => packet.descentRate)
    const mockAltitude1 = useMockDataFlow().map(packet => packet.altitude1)
    const mockAltitude2 = useMockDataFlow().map(packet => packet.altitude2)
    const mockAltitudeDifference  = useMockDataFlow().map(packet=> packet.altitudeDifference)

    useEffect(() => {
        setInterval(() => {
            setTempData(mockTempData)
            setPressure1Data(mockPressure1Data)
            setPressure2Data(mockPressure2Data)
            setVoltageData(mockVoltageData)
            setDescentRate(mockDescentRate)
            setAltitude1(mockAltitude1)
            setAltitude2(mockAltitude2)
            setAltitudeDifference(altitudeDifference)
        }, 1000)
    })

    return (

        <div className={style.MainContainer}>
            <div className={style.Flight}>
                <Chart type='temperature' mainData={tempData} />
                <Chart type='pressure' mainData={pressure1Data} optionalData={pressure2Data} />
                <Chart type='voltage' mainData={voltageData} />
                <Chart type='descentRate' mainData={descentRate} />
                <Chart type='altitude' mainData={altitude1} optionalData={altitude2} />

                <div className={style.flightWrapper}>
                <Ias errorCode={useMockDataFlow()[0].errorCode} />
                <Mfm />
                <ParachuteControl />
                <AltitudeDiff altitudeDifference={mockAltitudeDifference[0]}/>
            </div>

            </div>

            <div className={style.realInfo}>
                <Map />
                <Payload />
                <Camera />
            </div>

           <div className={style.controller}>
           <Termninal data={useMockDataFlow()} mode='preview' />
            
           </div>

            
        </div>
    )
}


export { Flight } 