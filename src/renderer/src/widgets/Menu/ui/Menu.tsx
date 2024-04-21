import { CloseOutlined, FileTextOutlined, VideoCameraAddOutlined, VideoCameraOutlined } from '@ant-design/icons'
import style from './Menu.module.scss'
import { useAppDispatch } from '@renderer/app/globals/redux/hooks'
import { toggleMenu } from '../model/menuSlice'
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { ThemeContext } from '@renderer/app/globals/theme/ThemeProvider'
import { themeConfig } from '@renderer/shared/model'
import { useTerminalSkin } from '@renderer/entities/Terminal/lib'

const Menu = (): JSX.Element => {

    const dispatch = useAppDispatch()

    const toggle = (): void => { dispatch(toggleMenu()) }
    const isConnected = true
    const isRecoring = false
    const navigate = useNavigate()
    const [theme] = useContext(ThemeContext)
    const baudRates = [300, 1200, 2400, 4800, 9600, 14400, 19200, 28800, 38400, 57600, 115200, 230400, 460800, 921600]

    return (
        <div style={{
            backgroundColor: theme === 'dark' ? themeConfig.darkWidget : themeConfig.lightWidget,
            color: theme === 'dark' ? 'white' : 'black'
        }} className={style.Menu}>
            <CloseOutlined onClick={toggle} className={style.close} style={{ fontSize: '1.5rem' }} />
            <div onClick={() => navigate('/terminal')} className={style.section} style={{ borderTop: `1px solid ${theme === 'dark' ? themeConfig.darkWidgetBorder : themeConfig.lightWidgetBorder}` }}>Terminal Mode</div>
            <div onClick={() => navigate('/flight')} className={style.section} style={{ borderTop: `1px solid ${theme === 'dark' ? themeConfig.darkWidgetBorder : themeConfig.lightWidgetBorder}` }}>Flight Mode</div>
            <div className={style.Config} style={{ borderTop: `1px solid ${theme === 'dark' ? themeConfig.darkWidgetBorder : themeConfig.lightWidgetBorder}` }}>
                <div className={style.baudRate}>
                    <span style={{ color: theme === 'dark' ? 'white' : 'black' }}>BAUDRATE:</span>
                    <select className={style.options}>
                        <option className={style.cameraOption}>SELECT BAUDRATE</option>
                        {baudRates.map(baud => <option key={baud} value={baud}>{baud} baud</option>)}
                    </select>
                </div>
                <div className={style.port}>
                    <span style={{ color: theme === 'dark' ? 'white' : 'black' }}>PORT:</span>
                    <select className={style.options}>
                        <option className={style.options}>SELECT PORT</option>
                    </select>
                </div>

                {isConnected ? <Button style={{ background: 'green', color: 'white' }} type='text'>Connect</Button> :
                    <Button style={{ background: 'red', color: 'white' }} type='text'>Disconnect</Button>
                }

                <div className={style.camera}>
                    <span style={{ color: theme === 'dark' ? 'white' : 'black' }}>CAMERA:</span>

                    <select className={style.options}>
                        <option className={style.cameraOption}>SELECT CAMERA</option>
                    </select>
                </div>
                {
                    !isRecoring ? <Button style={{ background: 'rgb(255,0,0)', color: 'rgb(255,255,255)', border: 'unset' }}>Record</Button>
                        : <Button style={{ background: 'rgb(100,100,100)', color: 'rgb(255,255,255)', border: 'unset' }}>Stop/Save</Button>
                }
           
           <div className={style.FileManager}>
            <h2 style={{...useTerminalSkin(), border: 'unset'}}>File Management</h2>
                    <Button icon={<VideoCameraOutlined/>} type='primary'>Get Recorded Video</Button>
                    <Button icon={<FileTextOutlined />} type='primary'>Get Recorded Data</Button>
                </div>
            </div>



        </div>
    )
}

export { Menu }