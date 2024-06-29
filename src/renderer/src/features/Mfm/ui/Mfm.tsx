import React, { useContext, useState } from 'react';
import style from './Mfm.module.scss';
import { themeSetter } from '../../../shared/config/theme/model/themeSetter';
import { ThemeContext } from '../../../app/providers/ThemeProvider/ThemeProvider';
import { Button } from 'antd';
import { useAppDispatch, useAppSelector } from '@renderer/app/redux/hooks';
import { initiaControllingState, setMfm } from '@renderer/widgets/SatController/model/controllingData';
import { Trans, useTranslation } from 'react-i18next';

const Mfm = ():JSX.Element => {

    const commands = ['N','R', 'G', 'B',0,1,2,3,4,5,6,7,8,9]
    const {theme} = useContext(ThemeContext)
    const [firstCommand, setFirstCommand]= useState<number>(0)
    const [secondCommand, setSecondCommand]= useState<string>('N')
    const [thirdCommand, setThirdCommand]= useState<number>(0)
    const [fourthCommand, setFourthCommand]= useState<string>('N')
    const flightPath = useAppSelector(state=>state.portConfigReducer.flightPath)
    const iotData = useAppSelector(state=>state.iotDataStoreReducer)
    const dispatch = useAppDispatch()
    useTranslation()
    
    


    const mfmHandler = ():void =>{
        const latestIotData  = iotData[iotData.length-1].temperature
        const mfmData = `${firstCommand}${secondCommand}${thirdCommand}${fourthCommand}`
        const mfmSendData = JSON.stringify({...initiaControllingState, mfm: mfmData, iot: latestIotData})
        dispatch(setMfm({mfm: mfmData}))

        window.api.controlTheMfm(mfmSendData, flightPath)

    }


    const localStyles:React.CSSProperties = {
        ...themeSetter(theme)        
    }

    return(
        <div style={localStyles} className={style.Mfm}>
            <select style={localStyles} onChange={(event)=>setFirstCommand(parseInt(event.target.value))}>
                {
                    commands.slice(4).map(command=><option key={command} value={command}>{command}</option>)
                }
            </select>
            <select style={localStyles} onChange={(event)=>setSecondCommand(event.target.value)}>
                {
                    commands.slice(0,4).map(command=><option key={command} value={command}>{command}</option>)
                }
            </select>
            <select style={localStyles} onChange={(event)=>setThirdCommand(parseInt(event.target.value))}>
                {
                    commands.slice(4).map(command=><option key={command} value={command}>{command}</option>)
                }
            </select>
            <select style={localStyles} onChange={(event)=>setFourthCommand(event.target.value)}>
                {
                    commands.slice(0,4).map(command=><option key={command} value={command}>{command}</option>)
                }
            </select>
            <Button onClick={mfmHandler} type='primary'><Trans>SEND</Trans></Button>
        </div>
    )
}

export {Mfm}