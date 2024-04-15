import { Route, Routes } from "react-router-dom"
import { Flight } from "./Flight"
import { Terminal } from "./Terminal/ui/Terminal"
import { Config } from "./Config"


export const Router = ():JSX.Element => {
    return(
        <Routes>
            <Route path="/flight" element={<Flight/>}></Route>
            <Route path="/terminal" element={<Terminal/>}></Route>
            <Route path="/config" element={<Config/>}></Route>
        </Routes>
    )
}