import { Button } from 'antd'
import style from './FileManager.module.scss'
import { Trans, useTranslation } from 'react-i18next'

const FileManager = ():JSX.Element => {
    useTranslation();
    const getOutputFiles = ():void => {
        window.api.openOuputFiles()
    }

    return(
        <div className={style.FileManager}>
            <span className={style.title}><Trans>FILE_MANAGER</Trans></span>
            <Button type='primary' onClick={getOutputFiles}><Trans>BROWSE_OUTPUT_FILES</Trans></Button>
        </div>
    )
}

export {FileManager}