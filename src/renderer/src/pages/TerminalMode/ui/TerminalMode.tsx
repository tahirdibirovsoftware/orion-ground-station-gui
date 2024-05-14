import { Terminal } from '../../../widgets/Terminal';
import style from './TerminlaMode.module.scss';



const TerminalMode = ():JSX.Element => {
    return(
        <div className={style.TerminalMode}>
            <Terminal mode='full'/>
        </div>
    )
}

export {TerminalMode}