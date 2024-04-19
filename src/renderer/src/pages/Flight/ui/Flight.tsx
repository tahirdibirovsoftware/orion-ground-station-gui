import { Chart } from '@renderer/entities/Chart/ui/Chart'
import style from './Flight.module.scss'
import { Camera } from '@renderer/entities/Camera/ui/Camera/Camera'
import { Termninal } from '@renderer/entities/Terminal/ui/Terminal'
import { generateMockTelemetryData } from '@renderer/shared/lib/mockTelemetryGenerator'


const Flight = (): JSX.Element => {
    return (

        <>
            <div className={style.Flight}>
                <Chart type='temperature' />
                <Chart type='pressure' />
                <Chart type='voltage' />
                <Chart type='altitude' />
                <Chart type='axes' />
                <Chart type='descentRate' />
                <Chart type='position' />
                <Camera />
                <Termninal data={generateMockTelemetryData()} mode='preview'/>
            </div>
        </>
    )
}


export { Flight } 