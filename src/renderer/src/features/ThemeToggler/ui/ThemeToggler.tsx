import { Switch } from 'antd'
import style from './ThemeToggler.module.scss'
import { MoonOutlined, SunOutlined } from '@ant-design/icons'
import { useContext } from 'react'
import { ThemeContext } from '../../../app/providers/ThemeProvider/ThemeProvider'
import { ThemeMode } from '../../../shared/config/theme/types'


const ThemeToggler = (): JSX.Element => {

    const { theme, setTheme } = useContext(ThemeContext)

    const toggleTheme = (theme: ThemeMode): ThemeMode => {
        if (theme === 'dark') setTheme('light')
        else if (theme === 'light') setTheme('dark')
        return theme
    }


    return (
        <div className={style.ThemeToggler}>
            <Switch onChange={() => toggleTheme(theme)} unCheckedChildren={<MoonOutlined />} checkedChildren={<SunOutlined />} />
        </div>
    )
}

export { ThemeToggler }