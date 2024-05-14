import React, { useContext } from 'react';
import style from './Mfm.module.scss';
import { themeSetter } from '../../../shared/config/theme/themeSetter';
import { ThemeContext } from '../../../app/providers/ThemeProvider/ThemeProvider';
import { Button } from 'antd';

const Mfm = ():JSX.Element => {

    const commands = ['N','R', 'G', 'B',0,1,2,3,4,5,6,7,8,9]
    const {theme} = useContext(ThemeContext)

    let localStyles:React.CSSProperties = {
        ...themeSetter(theme)        
    }

    return(
        <div style={localStyles} className={style.Mfm}>
            <select style={localStyles}>
                {
                    commands.map(command=><option key={command} value={command}>{command}</option>)
                }
            </select>
            <select style={localStyles}>
                {
                    commands.map(command=><option key={command} value={command}>{command}</option>)
                }
            </select>
            <select style={localStyles}>
                {
                    commands.map(command=><option key={command} value={command}>{command}</option>)
                }
            </select>
            <select style={localStyles}>
                {
                    commands.map(command=><option key={command} value={command}>{command}</option>)
                }
            </select>
            <Button type='primary'>Send</Button>
        </div>
    )
}

export {Mfm}