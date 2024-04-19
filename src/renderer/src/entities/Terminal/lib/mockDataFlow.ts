import { generateMockTelemetryData } from "@renderer/shared/lib/mockTelemetryGenerator"
import { ITelemetry } from "@renderer/shared/model/types"
import { useEffect, useState } from "react"

export const useMockDataFlow = ():Array<ITelemetry>=>{
    const [data, setData] = useState<Array<ITelemetry>>(generateMockTelemetryData())

    useEffect(()=>{
        setInterval(()=>{
            setData(generateMockTelemetryData())
        },1000)
    },[])

    return data
    
}