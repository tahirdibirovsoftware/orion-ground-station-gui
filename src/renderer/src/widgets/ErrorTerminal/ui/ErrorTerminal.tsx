import { FC, useContext } from 'react'
import style from './Errorterminal.module.scss'
import { ThemeContext } from '../../../app/providers/ThemeProvider/ThemeProvider'
import { themeSetter } from '../../../shared/config/theme/themeSetter'
import { Error } from '../../../entities/Error'
import { IErrorTerminal } from '../model/types'


const ErrorTerminal: FC<IErrorTerminal> = ({ errorCode }): JSX.Element => {

    const { theme } = useContext(ThemeContext)
    const localStyles: React.CSSProperties = {
        ...themeSetter(theme)
    }

    const errorStatuses = [
        'Container landing rate failure',
        'Science Payload landing rate failure',
        'Container pressure data failure',
        'Science Payload position data failure',
        'Release failure'
    ].map(error=>error.split(' ').join('_').toUpperCase())
    console.log(errorCode)
    const processedErrorCode = errorCode && errorCode.toString().split('').map(code => parseInt(code))

    return (
        <div style={localStyles} className={style.ErrorTerminal}>
            {


               processedErrorCode && processedErrorCode.map((code, idx) => (
                   code===1 && <Error key={idx} content={errorStatuses[idx]} />
                ))


            }
        </div>
    )
}

export { ErrorTerminal }