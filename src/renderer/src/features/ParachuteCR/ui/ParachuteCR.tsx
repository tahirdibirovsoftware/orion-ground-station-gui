import React, { useContext, useCallback, useMemo } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { ThemeContext } from '@renderer/app/providers/ThemeProvider/ThemeProvider';
import { useAppDispatch, useAppSelector } from '@renderer/app/redux/hooks';
import { themeSetter } from '@renderer/shared/config/theme/model/themeSetter';
import { commandTheParachute, initiaControllingState } from '@renderer/widgets/SatController/model/controllingData';
import style from './ParachuteCR.module.scss';
import { ALL_BORDERS } from '@renderer/shared/config/theme/constants';

const ParachuteCR: React.FC = () => {
    useTranslation();
    const dispatch = useAppDispatch();
    const { theme } = useContext(ThemeContext);

    const { isParachuteOpened, flightPath, latestIotData } = useAppSelector(state => ({
        isParachuteOpened: state.controllingDataReducer.parachuteState,
        flightPath: state.portConfigReducer.flightPath,
        latestIotData: state.iotDataStoreReducer[state.iotDataStoreReducer.length - 1]?.temperature
    }));

    const parachuteHandler = useCallback((): void => {
        const newParachuteState = isParachuteOpened ? 0 : 1;
        const sentData = JSON.stringify({
            ...initiaControllingState,
            parachuteState: newParachuteState,
            iot: latestIotData
        });

        dispatch(commandTheParachute({ parachuteState: newParachuteState }));
        window.api?.controlTheParachute(sentData, flightPath);
    }, [isParachuteOpened, latestIotData, flightPath, dispatch]);

    const themeStyles = useMemo(() => themeSetter(theme, ALL_BORDERS, [0,0,5,1]), [theme]);

    return (
        <div style={themeStyles} className={style.ParachuteCR}>
            <span className={style.parachuteStatus}>
                <Trans>PARACHUTE_STATUS</Trans>: <Trans>{isParachuteOpened ? 'OPENED' : 'CLOSED'}</Trans>
            </span>
            <button className={style.switchBtn} onClick={parachuteHandler}>
                <Trans>{isParachuteOpened ? 'CLOSE' : 'OPEN'}</Trans>
            </button>
        </div>
    );
};

export { ParachuteCR };