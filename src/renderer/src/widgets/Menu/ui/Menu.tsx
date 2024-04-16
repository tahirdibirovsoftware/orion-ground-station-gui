import { CloseOutlined } from '@ant-design/icons'
import style from './Menu.module.scss'
import { useAppDispatch } from '@renderer/app/globals/redux/hooks'
import { toggleMenu } from '../model/menuSlice'
import { Button, InputNumber } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { ThemeContext } from '@renderer/app/globals/theme/ThemeProvider'

const Menu = ():JSX.Element =>{

    const dispatch = useAppDispatch()

    const toggle = ():void=> {dispatch(toggleMenu())}
    const isConnected = true
    const navigate = useNavigate()
    const [theme] = useContext(ThemeContext)

    return(
        <div style={{
            backgroundColor: theme==='dark'? 'rgb(30, 30, 30)': 'rgb(150, 150, 150)',
            color: theme==='dark' ? 'white':'black'
            }} className={style.Menu}>
            <CloseOutlined onClick={toggle} className={style.close} style={{fontSize: '1.5rem'}}/>
            <div onClick={()=>navigate('/terminal')} className={style.section}>Terminal Mode</div>
            <div onClick={()=>navigate('/flight')}  className={style.section} style={{borderBottom: '1px solid black'}}>Flight Mode</div>
            <div className={style.Config}>
            <div className={style.baudRate}>
                <span style={{ color: theme==='dark' ? 'white':'black'}}>BAUDRATE:</span>
            <InputNumber placeholder='BAUDRATE:' className={style.NumInput} style={{backgroundColor: theme==='dark'? 'rgb(200,200,200)': 'white'}} />
            </div>
            <div className={style.port}>
                <span style={{ color: theme==='dark' ? 'white':'black'}}>PORT:</span>
            <InputNumber placeholder='PORT:' style={{backgroundColor: theme==='dark'? 'rgb(200,200,200)': 'white'}} className={style.NumInput}/>
            </div>
            { isConnected ? <Button style={{background: 'green', color: 'white'}} type='text'>Connect</Button>: 
            <Button style={{background: 'red', color: 'white'}} type='text'>Disconnect</Button>
            }
        </div>
        </div>
    )
}

export {Menu}