import { Button } from 'antd';
import style from './IoTDataSender.module.scss';
import { useAppDispatch, useAppSelector } from '@renderer/app/redux/hooks';
import { initiaControllingState, setIot } from '@renderer/widgets/SatController/model/controllingData';
import { Trans, useTranslation } from 'react-i18next';



const IoTDataSender = ():JSX.Element => {

    useTranslation();
    const iotData = useAppSelector(state=>state.iotDataStoreReducer)
    const flightPath = useAppSelector(state=>state.portConfigReducer.flightPath)
    const dispatch = useAppDispatch()
    const latestIotData = iotData[iotData.length -1]

    const iotDataHandler = ():void=>{

        const sentData = JSON.stringify({...initiaControllingState, iot: latestIotData.temperature})
        dispatch(setIot({iot: latestIotData.temperature}))
        window.api.sendIotData(sentData, flightPath)
    }

    return(
        <div className={style.IoTDataSender}>
            <Button onClick={iotDataHandler} className={style.IoTButton} type='primary'><Trans>SEND</Trans></Button>
        </div>
    )
}

export {IoTDataSender}