import { CloseOutlined } from '@ant-design/icons'
import style from './Menu.module.scss'

const Menu = ():JSX.Element =>{
    return(
        <div className={style.Menu}>
            <CloseOutlined className={style.close} style={{fontSize: '1.5rem'}}/>
            <div className={style.section}>Terminal Mode</div>
            <div className={style.section}>Flight Mode</div>
            <div className={style.section} style={{borderBottom: '1px solid black'}}>Configurations</div>
        </div>
    )
}

export {Menu}