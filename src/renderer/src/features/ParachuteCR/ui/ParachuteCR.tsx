import { Button } from 'antd';
import style from './ParachuteCR.module.scss';
import { useAppDispatch, useAppSelector } from '@renderer/app/redux/hooks';
import { commandTheParachute, initiaControllingState } from '@renderer/widgets/SatController/model/controllingData';


const ParachuteCR = ():JSX.Element => {

    const isParachuteOpened = useAppSelector(state=>state.controllingDataReducer.parachuteState)
    const flightPath = useAppSelector(state=>state.portConfigReducer.flightPath)
    const iotData = useAppSelector(state=>state.iotDataStoreReducer)
    const dispatch = useAppDispatch()


    const parachuteHandler = ():void =>{
        const latestIotData = iotData[iotData.length-1].temperature
        if(isParachuteOpened){
            const sentData = JSON.stringify({...initiaControllingState, parachuteState: 0, iot: latestIotData})
            dispatch(commandTheParachute({parachuteState: 0}))
            window.api.controlTheParachute(sentData, flightPath)
        }
        else{
            const sentData = JSON.stringify({...initiaControllingState, parachuteState: 1, iot: latestIotData})
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