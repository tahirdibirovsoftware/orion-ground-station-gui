/* eslint-disable react/prop-types */
import React, { FC, useContext, useMemo } from 'react'
import style from './IoTManager.module.scss'
import { ThemeContext } from '../../../app/providers/ThemeProvider/ThemeProvider'
import { themeSetter } from '../../../shared/config/theme/model/themeSetter'
import { IoTView } from '../../../entities/IoTView'
import { IoTDataSender } from '../../../features/IoTDataSender/ui/IoTDataSender'
import { IIoTManager } from '../model/types'
import { ALL_BORDERS } from '@renderer/shared/config/theme/constants'

const IoTManager: FC<IIoTManager> = React.memo(({ iotData }) => {
  const { theme } = useContext(ThemeContext)

  const localStyles = useMemo(() => themeSetter(theme, ALL_BORDERS, [0,0,5,1]), [theme])

  return (
    <div style={localStyles} className={style.IoTManager}>
      <IoTView iotData={iotData} />
      <IoTDataSender />
    </div>
  )
})

IoTManager.displayName = 'IoTManager'

export { IoTManager }