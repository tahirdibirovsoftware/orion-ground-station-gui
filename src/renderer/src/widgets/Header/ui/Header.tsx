import { FC, useContext } from 'react'
import style from './Header.module.scss'
import { Theme } from '@renderer/shared/model'
import { ThemeContext } from '@renderer/app/globals/theme/ThemeProvider'
import { MenuOutlined, MoonOutlined, SunOutlined } from '@ant-design/icons'
import { Logo } from '@renderer/entities/Logo'
import { Clock } from '@renderer/entities/Clock'
import { useAppDispatch } from '@renderer/app/globals/redux/hooks'
import { toggleMenu } from '@renderer/widgets/Menu/model/menuSlice'
import Switch from 'antd/es/switch'

interface IHeader {
    theme?: Theme,
}

const Header:FC<IHeader> = ():JSX.Element => {

    const dispatch = useAppDispatch()
    const [theme, setTheme] = useContext(ThemeContext)

    const toggle = ():void=> {dispatch(toggleMenu())}
    const onChange = (checked: boolean) => {
        setTheme(theme === 'dark' ? 'light': 'dark')
      };

    return(
        <div style={{backgroundColor: theme==='dark'? 'black': 'white', border: theme==='dark'? '1px solid rgb(30, 30, 30)': '1px solid black'}} className={style.Header}>
            <MenuOutlined className={style.menuButton} onClick={toggle} style={{color: theme==='dark'? 'white': 'black', fontSize: '1.5rem'}}/>
            <Logo size={2} color={theme==='dark'? 'white': 'black'}/>
            <div className={style.features}>
            <Clock/>
            <Switch style={{background: 'black'}} checkedChildren={<SunOutlined />} unCheckedChildren={<MoonOutlined />} onChange={onChange} />
            </div>
        </div>
    )
}

export {Header}