import { Navigate, Route, Routes } from "react-router-dom"
import { FlightMode } from "./FlightMode"
import { TerminalMode } from "./TerminalMode"
import { IIoTTelemetry, ITelemetry } from "src/global/types/types"
import { FC } from "react"

interface IRouter {
  flightData: Array<ITelemetry>
  iotData: Array<IIoTTelemetry>
}

const Router:FC<IRouter> = ({flightData, iotData}):JSX.Element => {
 
  return(
    <Routes>
        <Route path="/flight" element={<FlightMode iotData={iotData} flightData={flightData}/>}/>
        <Route path="/terminal" element={<TerminalMode flightData={flightData}/>}/>
        <Route path="*" element={<Navigate to={'/flight'}/>}/>
    </Routes>
  )


}


export {Router}