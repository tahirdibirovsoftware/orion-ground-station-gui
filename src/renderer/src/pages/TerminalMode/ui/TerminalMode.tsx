import { FC, memo } from 'react';
import { Terminal } from '../../../widgets/Terminal';
import style from './TerminlaMode.module.scss';
import { ITerminal } from '../model/types';



const TerminalModeComponent: FC<ITerminal> = ({ flightData }): JSX.Element => {
    return (
        <div className={style.TerminalMode}>
            <Terminal flightData={flightData} mode='full' />
        </div>
    )
}

export const TerminalMode = memo(TerminalModeComponent)