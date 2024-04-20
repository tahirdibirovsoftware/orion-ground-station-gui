import { FC, useContext } from 'react'
import style from './Ias.module.scss'
import { IIas } from '../model'
import { decimalToBinaryArray } from '@renderer/shared/lib'
import { ThemeContext } from '@renderer/app/globals/theme/ThemeProvider'
import { useTerminalSkin } from '@renderer/entities/Terminal/lib'

const Ias:FC<IIas> = ({errorCode}):JSX.Element => {

    const binaryCode = decimalToBinaryArray(errorCode)
    const [theme] = useContext(ThemeContext)


    return(
    <div style={useTerminalSkin()} className={style.Ias}>
        {
            binaryCode.map((_,idx)=> <div style={useTerminalSkin()} className={[style.bit, style.bitNumber].join(' ')}>{idx+1}</div>)
        }
       {
        binaryCode.map(code=>(code ? <div style={{...useTerminalSkin(), background: 'green'}} className={[style.bit, style.bitSuccess].join(' ')}>{code}</div> : <div style={{...useTerminalSkin(), background: 'red'}} className={[style.bit, style.bitError].join(' ')}>{code}</div>))
       }
    </div>
)
}

export {Ias}