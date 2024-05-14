import { Button } from 'antd'
import style from './FileManager.module.scss'

const FileManager = ():JSX.Element => {
    return(
        <div className={style.FileManager}>
            <span className={style.title}>File Manager</span>
            <Button>Browse output files</Button>
        </div>
    )
}

export {FileManager}