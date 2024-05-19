import { FC } from 'react';
import { Terminal } from '../../../widgets/Terminal';
import style from './TerminlaMode.module.scss';
import { ITerminal } from '../model/types';



const TerminalMode:FC<ITerminal> = ({data}):JSX.Element => {
    return(
        <div className={style.TerminalMode}>
            <Terminal data={data} mode='full'/>
        </div>
    )
}

export {TerminalMode}