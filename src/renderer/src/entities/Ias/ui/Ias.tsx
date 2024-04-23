import { FC } from 'react'
import style from './Ias.module.scss'
import { IIas } from '../model'
import { decimalToBinaryArray } from '@renderer/shared/lib'

import { useTerminalSkin } from '@renderer/entities/Terminal/lib'

const Ias:FC<IIas> = ({errorCode}):JSX.Element => {

    const binaryCode = decimalToBinaryArray(errorCode)



    return(
    <div style={useTerminalSkin()} className={style.Ias}>
        {
            binaryCode.map((_,idx)=> <div key={idx} style={useTerminalSkin()} className={[style.bit, style.bitNumber].join(' ')}>{idx+1}</div>)
        }
       {
        binaryCode.map((code, idx)=>(!code ? <div key={idx} style={{...useTerminalSkin(), background: 'green'}} className={[style.bit, style.bitSuccess].join(' ')}>{code}</div> : <div key={idx} style={{...useTerminalSkin(), background: 'red'}} className={[style.bit, style.bitError].join(' ')}>{code}</div>))
       }
    </div>
)
}

export {Ias}