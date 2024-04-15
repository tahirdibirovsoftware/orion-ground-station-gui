import style from './app.module.scss'
import { Header } from '@renderer/widgets/Header/ui/Header'
import { Theme } from '@renderer/shared/model'
import { FC, useContext } from 'react'
import { ThemeContext } from '../globals/theme/ThemeProvider'
import { createPortal } from 'react-dom'
import { Menu } from '@renderer/widgets/Menu'
import { useAppSelector } from '../globals/redux/hooks'

interface IApp {
    theme?: Theme
}

const App:FC<IApp> = ():JSX.Element=>{

    const theme = useContext(ThemeContext)
    const isOpen = useAppSelector(state=>state.menu.isOpen)

    return(
        <div style={{backgroundColor: theme==='dark'? 'black': 'white'}} className={style.App}>
            <Header theme='light'/>
            {
                createPortal(
                   isOpen && <Menu/>
                    ,document.body)
            }
        </div>
    )
}


export {App}