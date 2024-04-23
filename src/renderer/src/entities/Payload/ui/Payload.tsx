import style from './Payload.module.scss'
import payloadImg from './payload3D.png'
const Payload = ():JSX.Element => {
    return(
        <div className={style.Payload}>
            <img src={payloadImg} alt="" />
        </div>
    )
}

export {Payload}