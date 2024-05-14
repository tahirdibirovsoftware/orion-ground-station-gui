import { Route, Routes } from "react-router-dom"
import { FlightMode } from "./FlightMode"
import { TerminalMode } from "./TerminalMode"


const Router = ():JSX.Element => {

  return(
    <Routes>
        <Route path="/flight" element={<FlightMode/>}/>
        <Route path="/terminal" element={<TerminalMode/>}/>
    </Routes>
  )


}


export {Router}