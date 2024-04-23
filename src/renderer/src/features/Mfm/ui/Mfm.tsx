import { Button } from 'antd'
import style from './Mfm.module.scss'
import { useTerminalSkin } from '@renderer/entities/Terminal/lib'

const Mfm = ():JSX.Element => {

    const staticValues = [0, 1,2,3,4,5,6,7,8,9, 'R','G','B', 'N']

    return(
        <div style={useTerminalSkin()} className={style.Mfm}>
            <select style={useTerminalSkin()} className={style.Selector} name="" id="">
                {staticValues.map(value=><option className={style.Option} key={value} value={value}>{value}</option>)}
            </select>
            <select style={useTerminalSkin()} className={style.Selector} name="" id="">
                 {staticValues.map(value=><option className={style.Option} key={value} value={value}>{value}</option>)}
            </select>
            <select style={useTerminalSkin()} className={style.Selector} name="" id="">
                {staticValues.map(value=><option className={style.Option} key={value} value={value}>{value}</option>)}
            </select>
            <select style={useTerminalSkin()} className={style.Selector} name="" id="">
                 {staticValues.map(value=><option className={style.Option} key={value} value={value}>{value}</option>)}
            </select>
            <Button style={{...useTerminalSkin(), border: 'unset', backgroundColor: 'rgb(0,160,255)', color: 'white'}}>GÖNDER</Button>
        </div>
    )
}

export {Mfm}