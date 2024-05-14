import { Button } from 'antd';
import style from './ParachuteCR.module.scss';


const ParachuteCR = ():JSX.Element => {
    return(
        <div className={style.ParachuteCR}>
            <Button>Open the parachute</Button>
        </div>
    )
}


export {ParachuteCR}