import style from './Map.module.scss'
import mapImg from './GoogleMapTA.webp'

const Map  = ():JSX.Element => {
    return(
        <div className={style.Map}>
          <img src={mapImg} alt="" />
        </div>
    )
}

export {Map}