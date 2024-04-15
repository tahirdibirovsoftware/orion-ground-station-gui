import { Router } from '@renderer/pages'
import style from './Mode.module.scss'

const Mode = ():JSX.Element => {
    return(
        <div className={style.Mode}>
            <Router/>
        </div>
    )
}

export {Mode}