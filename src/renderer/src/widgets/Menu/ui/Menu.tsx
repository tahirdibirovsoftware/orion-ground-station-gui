import { CloseOutlined } from '@ant-design/icons'
import style from './Menu.module.scss'
import { useAppDispatch } from '@renderer/app/globals/redux/hooks'
import { toggleMenu } from '../model/menuSlice'

const Menu = ():JSX.Element =>{

    const dispatch = useAppDispatch()

    const toggle = ():void=> {dispatch(toggleMenu())}

    return(
        <div className={style.Menu}>
            <CloseOutlined onClick={toggle} className={style.close} style={{fontSize: '1.5rem'}}/>
            <div className={style.section}>Terminal Mode</div>
            <div className={style.section}>Flight Mode</div>
            <div className={style.section} style={{borderBottom: '1px solid black'}}>Configurations</div>
        </div>
    )
}

export {Menu}