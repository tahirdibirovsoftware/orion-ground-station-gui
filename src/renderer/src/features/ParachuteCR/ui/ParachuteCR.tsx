import { ThemeContext } from '@renderer/app/providers/ThemeProvider/ThemeProvider';
import style from './ParachuteCR.module.scss';
import { useAppDispatch, useAppSelector } from '@renderer/app/redux/hooks';
import { themeSetter } from '@renderer/shared/config/theme/themeSetter';
import { commandTheParachute, initiaControllingState } from '@renderer/widgets/SatController/model/controllingData';
import { useContext } from 'react';
import { Trans, useTranslation } from 'react-i18next';


const ParachuteCR = ():JSX.Element => {
    useTranslation();
    const isParachuteOpened = useAppSelector(state=>state.controllingDataReducer.parachuteState)
    const flightPath = useAppSelector(state=>state.portConfigReducer.flightPath)
    const iotData = useAppSelector(state=>state.iotDataStoreReducer)
    const dispatch = useAppDispatch()
    const {theme} = useContext(ThemeContext)
    


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
        <div style={themeSetter(theme)} className={style.ParachuteCR}>
            <span className={style.parachuteStatus}><Trans>PARACHUTE_STATUS</Trans>: <Trans>{isParachuteOpened ? 'OPENED' : 'CLOSED'}</Trans></span>
            <button className={style.switchBtn} onClick={parachuteHandler}><Trans>{isParachuteOpened ? 'CLOSE' : 'OPEN'}</Trans></button>
        </div>
    )
}


export {ParachuteCR}