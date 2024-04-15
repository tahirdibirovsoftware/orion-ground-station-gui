import { FC, useContext } from 'react'
import style from './Header.module.scss'
import { Theme } from '@renderer/shared/model'
import { ThemeContext } from '@renderer/app/globals/theme/ThemeProvider'
import { MenuOutlined } from '@ant-design/icons'
import { Logo } from '@renderer/entities/Logo'
import { Clock } from '@renderer/entities/Clock'
import { useAppDispatch } from '@renderer/app/globals/redux/hooks'
import { toggleMenu } from '@renderer/widgets/Menu/model/menuSlice'

interface IHeader {
    theme?: Theme,
}

const Header:FC<IHeader> = ():JSX.Element => {

    const dispatch = useAppDispatch()
    const theme = useContext(ThemeContext)

    const toggle = ():void=> {dispatch(toggleMenu())}

    return(
        <div style={{backgroundColor: theme==='dark'? 'black': 'white', border: theme==='dark'? '1px solid rgb(30, 30, 30)': '1px solid black'}} className={style.Header}>
            <MenuOutlined onClick={toggle} style={{color: theme==='dark'? 'white': 'black', fontSize: '1.5rem'}}/>
            <Logo size={2} color={theme==='dark'? 'white': 'black'}/>
            <Clock/>
        </div>
    )
}

export {Header}