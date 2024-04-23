import { Button } from 'antd'
import style from './Parachite.module.scss'

const ParachuteControl = ():JSX.Element => {
    return(
        <div className={style.ParachuteControl}>
            <Button type='primary'>Paraşütü aç</Button>
        </div>
    )
}

export {ParachuteControl}