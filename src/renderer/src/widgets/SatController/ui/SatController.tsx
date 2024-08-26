/* eslint-disable react/prop-types */
import React, { FC, useContext, useMemo } from 'react'
import { themeSetter } from '../../../shared/config/theme/model/themeSetter'
import style from './Satcontroller.module.scss'
import { ThemeContext } from '../../../app/providers/ThemeProvider/ThemeProvider'
import { Ias } from '../../../entities/Ias'
import { ErrorTerminal } from '../../ErrorTerminal'
import { AltDiff } from '../../../entities/AltDiff/ui/AltDiff'
import { Mfm } from '../../../features/Mfm'
import { IoTManager } from '../../IoTManager/ui/IoTManager'
import { ParachuteCR } from '../../../features/ParachuteCR'
import { SatStatus } from '../../../entities/SatStatus'
import { ISatController } from '../model/types'
import { DescentRate } from '@renderer/entities/DescentRate'

const SatController: FC<ISatController> = React.memo(({ flightData, iotData }) => {
  const { theme } = useContext(ThemeContext)

  const localStyles = useMemo(() => themeSetter(theme), [theme])

  const errorCode = useMemo(() => {
    const lastFlightData = flightData[flightData.length - 1]
    return lastFlightData?.errorCode || ''  // Return an empty string if errorCode is undefined
  }, [flightData])

  return (
    <div style={localStyles} className={style.SatController}>
      <SatStatus flightData={flightData} />
      <Mfm />
      <AltDiff flightData={flightData} />
      <DescentRate flightData={flightData} />
      <IoTManager iotData={iotData} />
      <ParachuteCR />
      <Ias errorCode={errorCode} />
      <ErrorTerminal errorCode={errorCode} />
    </div>
  )
})

SatController.displayName = 'SatController'

export { SatController }