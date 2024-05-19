import { Navigate, Route, Routes } from "react-router-dom"
import { FlightMode } from "./FlightMode"
import { TerminalMode } from "./TerminalMode"
import { ITelemetry } from "src/global/types/types"
import { FC } from "react"

interface IRouter {
  data: Array<ITelemetry>
}

const Router:FC<IRouter> = ({data}):JSX.Element => {
 
  return(
    <Routes>
        <Route path="/flight" element={<FlightMode data={data}/>}/>
        <Route path="/terminal" element={<TerminalMode data={data}/>}/>
        <Route path="*" element={<Navigate to={'/flight'}/>}/>
    </Routes>
  )


}


export {Router}