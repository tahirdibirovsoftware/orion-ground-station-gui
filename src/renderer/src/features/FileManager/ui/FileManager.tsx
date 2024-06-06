import { Button } from 'antd'
import style from './FileManager.module.scss'

const FileManager = ():JSX.Element => {

    const getOutputFiles = ():void => {
        window.api.openOuputFiles()
    }

    return(
        <div className={style.FileManager}>
            <span className={style.title}>File Manager</span>
            <Button onClick={getOutputFiles}>Browse output files</Button>
        </div>
    )
}

export {FileManager}