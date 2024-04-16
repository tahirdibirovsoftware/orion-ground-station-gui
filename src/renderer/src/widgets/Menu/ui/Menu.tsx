import { CloseOutlined } from '@ant-design/icons'
import style from './Menu.module.scss'
import { useAppDispatch } from '@renderer/app/globals/redux/hooks'
import { toggleMenu } from '../model/menuSlice'
import { Button, InputNumber } from 'antd'
import { useNavigate } from 'react-router-dom'

const Menu = ():JSX.Element =>{

    const dispatch = useAppDispatch()

    const toggle = ():void=> {dispatch(toggleMenu())}
    const isConnected = true
    const navigate = useNavigate()

    return(
        <div className={style.Menu}>
            <CloseOutlined onClick={toggle} className={style.close} style={{fontSize: '1.5rem'}}/>
            <div onClick={()=>navigate('/terminal')} className={style.section}>Terminal Mode</div>
            <div onClick={()=>navigate('/flight')}  className={style.section} style={{borderBottom: '1px solid black'}}>Flight Mode</div>
            <div className={style.Config}>
            <div className={style.baudRate}>
                <span>BAUDRATE:</span>
            <InputNumber placeholder='BAUDRATE:' className={style.NumInput}/>
            </div>
            <div className={style.port}>
                <span>PORT:</span>
            <InputNumber placeholder='PORT:' className={style.NumInput}/>
            </div>
            { isConnected ? <Button style={{background: 'green', color: 'white'}} type='text'>Connect</Button>: 
            <Button style={{background: 'red', color: 'white'}} type='text'>Disconnect</Button>
            }
        </div>
        </div>
    )
}

export {Menu}