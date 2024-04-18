import { useContext } from 'react'
import style from './Camera.module.scss'
import { ThemeContext } from '@renderer/app/globals/theme/ThemeProvider'
import { Glitch } from '../Glitch/Glitch'

export const Camera = ():JSX.Element => {

    const [theme] = useContext(ThemeContext)
    const cameraFound = false

    return(
        <div className={style.Camera} style={theme==='dark'?{border: '1px solid rgb(30,30,30)'}:{border: '1px solid rgb(100,100,100)'}}>
            {/* <h1>Camera Not Found!</h1> */}
            {!cameraFound && <Glitch/>}
        </div>
    )
}

