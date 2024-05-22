import { Button } from 'antd';
import style from './ParachuteCR.module.scss';
import { useAppDispatch, useAppSelector } from '@renderer/app/redux/hooks';
import { commandTheParachute, initiaControllingState } from '@renderer/widgets/SatController/model/controllingData';


const ParachuteCR = ():JSX.Element => {

    const isParachuteOpened = useAppSelector(state=>state.controllingDataReducer.parachuteState)
    const flightPath = useAppSelector(state=>state.portConfigReducer.flightPath)
    const dispatch = useAppDispatch()


    const parachuteHandler = ():void =>{
        if(isParachuteOpened){
            const sentData = JSON.stringify({...initiaControllingState, parachuteHandler: 0})
            dispatch(commandTheParachute({parachuteState: 0}))
            window.api.controlTheParachute(sentData, flightPath)
        }
        else{
            const sentData = JSON.stringify({...initiaControllingState, parachuteHandler: 1})
            dispatch(commandTheParachute({parachuteState: 1}))
            window.api.controlTheParachute(sentData, flightPath)
    }
    }


    return(
        <div className={style.ParachuteCR}>
            <Button onClick={parachuteHandler}>{isParachuteOpened ? 'Close' : 'Open'}</Button>
        </div>
    )
}


export {ParachuteCR}