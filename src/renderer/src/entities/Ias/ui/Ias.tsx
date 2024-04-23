import { FC } from 'react'
import style from './Ias.module.scss'
import { IIas } from '../model'
import { decimalToBinaryArray } from '@renderer/shared/lib'

import { useTerminalSkin } from '@renderer/entities/Terminal/lib'
import { WarningOutlined } from '@ant-design/icons'

const Ias:FC<IIas> = ({errorCode}):JSX.Element => {

    const binaryCode = decimalToBinaryArray(errorCode)

    const errorInterpretation = {
        '0': 'Model uydu iniş hızı sapması!',
        '1': 'Görev yükü iniş hızı sapması!',
        '2': 'Taşıyıcı basınç verisi alınamadı!',
        '3': 'Görev yükü konum verisi alınamadı!',
        '4': 'Ayrılma gerçekleşmedi!'
    }


    return(
    <>
    <div style={useTerminalSkin()} className={style.Ias}>
        {/* {
            binaryCode.map((_,idx)=> <div key={idx} style={useTerminalSkin()} className={[style.bit, style.bitNumber].join(' ')}>{idx+1}</div>)
        } */}
       {
        binaryCode.map((code, idx)=>(!code ? <div key={idx} style={{...useTerminalSkin(), background: 'green'}} className={[style.bit, style.bitSuccess].join(' ')}>{code}</div> : <div key={idx} style={{...useTerminalSkin(), background: 'red'}} className={[style.bit, style.bitError].join(' ')}>{code}</div>))
       }
       
    </div>
   <div draggable className={style.errorMonitor}>
   {
        binaryCode.map((code, idx)=>(Boolean(code) && <div key={idx} style={{...useTerminalSkin(), background: 'red'}} className={style.warnMessage} ><WarningOutlined/> {errorInterpretation[`${idx}`]}</div>))
       }
   </div>
       </>
)
}

export {Ias}