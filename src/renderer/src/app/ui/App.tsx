import style from './app.module.scss'
import { Header } from '@renderer/widgets/Header/ui/Header'
import { Theme } from '@renderer/shared/model'
import { FC, useContext } from 'react'
import { ThemeContext } from '../globals/theme/ThemeProvider'
import { createPortal } from 'react-dom'
import { Menu } from '@renderer/widgets/Menu'

interface IApp {
    theme?: Theme
}

const App:FC<IApp> = ():JSX.Element=>{

    const theme = useContext(ThemeContext)

    return(
        <div style={{backgroundColor: theme==='dark'? 'black': 'white'}} className={style.App}>
            <Header theme='light'/>
            {
                createPortal(
                    <Menu/>
                    ,document.body)
            }
        </div>
    )
}


export {App}