import React, { useContext, useState, useCallback, useMemo } from 'react';
import { Button } from 'antd';
import { Trans, useTranslation } from 'react-i18next';
import style from './Mfm.module.scss';
import { themeSetter } from '../../../shared/config/theme/model/themeSetter';
import { ThemeContext } from '../../../app/providers/ThemeProvider/ThemeProvider';
import { useAppDispatch, useAppSelector } from '@renderer/app/redux/hooks';
import { initiaControllingState, setMfm } from '@renderer/widgets/SatController/model/controllingData';

const Mfm: React.FC = () => {
    useTranslation();
    const { theme } = useContext(ThemeContext);
    const dispatch = useAppDispatch();

    const [firstCommand, setFirstCommand] = useState<number>(0);
    const [secondCommand, setSecondCommand] = useState<string>('N');
    const [thirdCommand, setThirdCommand] = useState<number>(0);
    const [fourthCommand, setFourthCommand] = useState<string>('N');

    const { flightPath, latestIotData } = useAppSelector(state => ({
        flightPath: state.portConfigReducer.flightPath,
        latestIotData: state.iotDataStoreReducer[state.iotDataStoreReducer.length - 1]?.temperature
    }));

    const commands = useMemo(() => ['N', 'R', 'G', 'B', 0, 1, 2, 3, 4, 5, 6, 7, 8, 9], []);
    const numericCommands = useMemo(() => commands.slice(4), [commands]);
    const stringCommands = useMemo(() => commands.slice(0, 4), [commands]);

    const localStyles = useMemo(() => themeSetter(theme), [theme]);

    const mfmHandler = useCallback(() => {
        const mfmData = `${firstCommand}${secondCommand}${thirdCommand}${fourthCommand}`;
        const mfmSendData = JSON.stringify({ ...initiaControllingState, mfm: mfmData, iot: latestIotData });
        dispatch(setMfm({ mfm: mfmData }));
        window.api?.controlTheMfm(mfmSendData, flightPath);
    }, [dispatch, firstCommand, secondCommand, thirdCommand, fourthCommand, latestIotData, flightPath]);

    const renderSelect = useCallback((
        value: number | string,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setter: React.Dispatch<React.SetStateAction<any>>,
        options: (string | number)[]
    ) => (
        <select
            style={localStyles}
            value={value}
            onChange={(event) => setter(options[0] === 'N' ? event.target.value : parseInt(event.target.value))}
        >
            {options.map(command => (
                <option key={command} value={command}>{command}</option>
            ))}
        </select>
    ), [localStyles]);

    return (
        <div style={localStyles} className={style.Mfm}>
            {renderSelect(firstCommand, setFirstCommand, numericCommands)}
            {renderSelect(secondCommand, setSecondCommand, stringCommands)}
            {renderSelect(thirdCommand, setThirdCommand, numericCommands)}
            {renderSelect(fourthCommand, setFourthCommand, stringCommands)}
            <Button onClick={mfmHandler} type='primary'><Trans>SEND</Trans></Button>
        </div>
    );
};

export { Mfm };