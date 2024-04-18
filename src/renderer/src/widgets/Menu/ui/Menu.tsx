import { CloseOutlined } from '@ant-design/icons'
import style from './Menu.module.scss'
import { useAppDispatch } from '@renderer/app/globals/redux/hooks'
import { toggleMenu } from '../model/menuSlice'
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { ThemeContext } from '@renderer/app/globals/theme/ThemeProvider'

const Menu = ():JSX.Element =>{

    const dispatch = useAppDispatch()

    const toggle = ():void=> {dispatch(toggleMenu())}
    const isConnected = true
    const navigate = useNavigate()
    const [theme] = useContext(ThemeContext)
    const baudRates = [300, 1200, 2400, 4800, 9600, 14400, 19200, 28800, 38400, 57600, 115200, 230400, 460800, 921600]

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
                <select className={style.options}>
                <option className={style.cameraOption}>SELECT BAUDRATE</option>
                {baudRates.map(baud=><option key={baud} value={baud}>{baud} baud</option>)}
                </select>  
            </div>
            <div className={style.port}>
                <span style={{ color: theme==='dark' ? 'white':'black'}}>PORT:</span>
                <select className={style.options}>
                <option className={style.options}>SELECT PORT</option>
                </select>    
            </div>
            
            <div className={style.camera}>
                <span style={{ color: theme==='dark' ? 'white':'black'}}>CAMERA:</span>
           
            <select className={style.options}>
                <option className={style.cameraOption}>SELECT CAMERA</option>
                </select>            
            </div>
            { isConnected ? <Button style={{background: 'green', color: 'white'}} type='text'>Connect</Button>: 
            <Button style={{background: 'red', color: 'white'}} type='text'>Disconnect</Button>
            }
        </div>
        </div>
    )
}

export {Menu}