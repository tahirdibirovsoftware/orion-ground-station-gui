import { useContext } from 'react'
import style from './Camera.module.scss'
import { ThemeContext } from '@renderer/app/globals/theme/ThemeProvider'

export const Camera = ():JSX.Element => {

    const [theme] = useContext(ThemeContext)

    return(
        <div>
            
        </div>
    )
}

