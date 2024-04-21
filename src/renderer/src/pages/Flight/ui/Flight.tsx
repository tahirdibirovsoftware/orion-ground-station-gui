import { Chart } from '@renderer/entities/Chart/ui/Chart'
import style from './Flight.module.scss'
import { Camera } from '@renderer/entities/Camera/ui/Camera/Camera'
import { Termninal } from '@renderer/entities/Terminal/ui/Terminal'
import { useMockDataFlow } from '@renderer/entities/Terminal/lib'
import { Ias } from '@renderer/entities/Ias/ui/Ias'
import { Mfm } from '@renderer/features/Mfm/ui/Mfm'
import { useEffect, useState } from 'react'


const Flight = (): JSX.Element => {
    const [tempData, setTempData] = useState<Array<number>>([])
    const [pressure1Data, setPressure1Data] = useState<Array<number>>([])
    const [pressure2Data, setPressure2Data] = useState<Array<number>>([])
    const [voltageData, setVoltageData] = useState<Array<number>>([])
    const mockTempData = useMockDataFlow().map(packet=>packet.temp)
    const mockPressure1Data = useMockDataFlow().map(packet=>packet.pressure1)
    const mockPressure2Data = useMockDataFlow().map(packet=>packet.pressure2)
    const mockVoltageData = useMockDataFlow().map(packet=>packet.voltageLevel)

    useEffect(()=>{
        setInterval(()=>{
            setTempData(mockTempData)
            setPressure1Data(mockPressure1Data)
            setPressure2Data(mockPressure2Data)
            setVoltageData(mockVoltageData)
        },1000)
    })

    return (

        <>
            <div className={style.Flight}>
                <Chart type='temperature' mainData={tempData}/>
                <Chart type='pressure' mainData={pressure1Data} optionalData={pressure2Data}/>
                <Chart type='voltage' mainData={voltageData}/>
                <Chart type='descentRate' />
                <Chart type='position' />
                <Chart type='position' />
                <Chart type='position' />
                <Camera />
                <Termninal data={useMockDataFlow()} mode='preview'/>
                <div className={style.flightWrapper}>
                <Ias errorCode={useMockDataFlow()[0].errorCode}/>
                <Mfm/>
                </div>
            </div>
        </>
    )
}


export { Flight } 