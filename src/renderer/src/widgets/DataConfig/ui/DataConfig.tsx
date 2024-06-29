import { FC, useContext } from 'react'
import { themeSetter } from '../../../shared/config/theme/model/themeSetter'
import style from './DataConfig.module.scss'
import { ThemeContext } from '../../../app/providers/ThemeProvider/ThemeProvider'
import { IDataConfig } from '../model/types'
import { getTitle } from '../lib/getTitle'
import { PortConfig } from '../../../features/PortConfig'
import { BaudRateConfig } from '../../../features/BaudRateConfig'
import { Connector } from '../../../features/Connector'
import { Trans, useTranslation } from 'react-i18next'

const DataConfig:FC<IDataConfig> = ({type}):JSX.Element =>{

    const {theme} = useContext(ThemeContext) 
    useTranslation()

    const localStyles:React.CSSProperties = {
        ...themeSetter(theme),
        borderTop: 'unset',
        borderRight: 'unset',
        borderLeft: 'unset'
    }


    return(
        <div className={style.DataConfig} style={localStyles}>
            <span className={style.title}><Trans>{getTitle(type)}</Trans></span>
            <PortConfig type={type}/>
            <BaudRateConfig type={type}/>
            <Connector type={type}/>
        </div>
    )
}

export {DataConfig}