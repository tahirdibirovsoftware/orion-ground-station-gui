import { Navigate, Route, Routes } from "react-router-dom"
import { FlightMode } from "./FlightMode"
import { TerminalMode } from "./TerminalMode"
import { ITelemetry } from "src/global/types/types"
import { FC } from "react"

interface IRouter {
  flightData: Array<ITelemetry>
}

const Router:FC<IRouter> = ({flightData}):JSX.Element => {
 
  return(
    <Routes>
        <Route path="/flight" element={<FlightMode flightData={flightData}/>}/>
        <Route path="/terminal" element={<TerminalMode flightData={flightData}/>}/>
        <Route path="*" element={<Navigate to={'/flight'}/>}/>
    </Routes>
  )


}


export {Router}