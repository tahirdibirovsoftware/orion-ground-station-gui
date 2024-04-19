import { Termninal } from '@renderer/entities/Terminal/ui/Terminal'
import style from './Terminal.module.scss'
import { useMockDataFlow } from '@renderer/entities/Terminal/lib'
import { SystemInfo } from '@renderer/entities/SystemInfo'
import { ISystemInfo } from '@renderer/entities/SystemInfo/model'


const Terminal  = ():JSX.Element => {

    const mockData:ISystemInfo={
        pid: 4323,
        platform: 'Linux',
        arch: 'x64'
    } 

    return(
        <div className={style.Terminal}>
            <SystemInfo {...mockData}></SystemInfo>
            <Termninal mode='full' data={useMockDataFlow()}/>
        </div>
    )
}


export {Terminal}