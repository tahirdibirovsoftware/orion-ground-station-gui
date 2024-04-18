import style from './Glitch.module.scss'
import glitch from '../../resources/glitch.gif'

const Glitch = ():JSX.Element => {


    return(
        <div className={style.Glitch}>
            <img className={style.glitcher} src={glitch} alt="" />
            <h3>Camera Not Found!</h3>
        </div>
    )
}

export {Glitch}