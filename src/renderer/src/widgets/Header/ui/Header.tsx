import { FC, useContext } from 'react'
import style from './Header.module.scss'
import { Theme } from '@renderer/shared/model'
import { ThemeContext } from '@renderer/app/globals/theme/ThemeProvider'
import { MenuOutlined } from '@ant-design/icons'
import { Logo } from '@renderer/entities/Logo'
import { Clock } from '@renderer/entities/Clock'

interface IHeader {
    theme?: Theme,
}

const Header:FC<IHeader> = ():JSX.Element => {

    const theme = useContext(ThemeContext)

    return(
        <div style={{backgroundColor: theme==='dark'? 'black': 'white', border: theme==='dark'? '1px solid rgb(30, 30, 30)': '1px solid black'}} className={style.Header}>
            <MenuOutlined style={{color: theme==='dark'? 'white': 'black', fontSize: '1.5rem'}}/>
            <Logo size={2} color={theme==='dark'? 'white': 'black'}/>
            <Clock/>
        </div>
    )
}

export {Header}