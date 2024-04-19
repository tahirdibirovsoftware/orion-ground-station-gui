import { Termninal } from '@renderer/entities/Terminal/ui/Terminal'
import style from './Terminal.module.scss'
import { useMockDataFlow } from '@renderer/entities/Terminal/lib'


const Terminal  = ():JSX.Element => {
    return(
        <div className={style.Terminal}>
            <Termninal mode='full' data={useMockDataFlow()}/>
        </div>
    )
}


export {Terminal}