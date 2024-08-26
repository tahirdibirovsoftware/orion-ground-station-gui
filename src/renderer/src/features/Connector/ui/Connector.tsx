import { FC, useEffect, useCallback, useMemo } from 'react';
import style from './Connector.module.scss';
import { IConnector } from '../model/types';
import { Button } from 'antd';
import { useAppDispatch, useAppSelector } from '@renderer/app/redux/hooks';
import { connectToFlight, connectToIoT } from '../model/connectorSlice';
import { addTelemetry, resetTelemetry } from '@renderer/widgets/DataController/model/flightDataStoreSlice';
import { IIoTTelemetry, ITelemetry } from 'src/global/types/types';
import { addIotData, resetIotTelemetryData } from '@renderer/widgets/DataController/model/iotDataStoreSlice';
import { Trans, useTranslation } from 'react-i18next';

const Connector: FC<IConnector> = ({ type }): JSX.Element => {
  useTranslation();
  const dispatch = useAppDispatch();

  const isConnected = useAppSelector((state) => 
    type === 'flight' ? state.connectorReducer.flightConnect === 'connected' : state.connectorReducer.iotConnect === 'connected'
  );

  const baudRate = useAppSelector((state) => 
    type === 'flight' ? state.baudRateReducer.flightBaudRate : state.baudRateReducer.iotBaudRate
  );

  const path = useAppSelector((state) => 
    type === 'flight' ? state.portConfigReducer.flightPath : state.portConfigReducer.iotPath
  );

  const isReady = useMemo(() => Boolean(path), [path]);

  const flightDataHandler = useCallback((data: ITelemetry): void => { dispatch(addTelemetry(data)); }, [dispatch]);
  const iotDataHandler = useCallback((data: IIoTTelemetry): void => { dispatch(addIotData(data)); }, [dispatch]);

  useEffect(() => {
    if (!path) {
      dispatch(type === 'flight' ? connectToFlight('disconnected') : connectToIoT('disconnected'));
    }
  }, [dispatch, type, path]);

  const connectHandler = useCallback((): void => {
    if (type === 'flight') {
      window.api.connectToFlight(path, Number(baudRate));
      window.api.getFlightData(flightDataHandler);
      dispatch(connectToFlight('connected'));
    } else {
      window.api.connectToIot(path, baudRate);
      window.api.getIotData(iotDataHandler);
      dispatch(connectToIoT('connected'));
    }
  }, [dispatch, type, path, baudRate, flightDataHandler, iotDataHandler]);

  const disconnectHandler = useCallback((): void => {
    if (type === 'flight') {
      window.api.disconnectFlight(path);
      dispatch(connectToFlight('disconnected'));
      dispatch(resetTelemetry());
    } else {
      window.api.disconnectIot(path);
      dispatch(connectToIoT('disconnected'));
      dispatch(resetIotTelemetryData());
    }
  }, [dispatch, type, path]);

  const buttonProps = useMemo(() => ({
    size: "small" as const,
    type: "text" as const,
    className: isConnected ? style.ButtonDisconnect : style.ButtonConnect,
    onClick: isConnected ? disconnectHandler : connectHandler,
    disabled: !isConnected && !isReady,
    style: !isConnected && !isReady ? { opacity: .3, cursor: 'default' } : {}
  }), [isConnected, isReady, connectHandler, disconnectHandler]);

  return (
    <div className={style.Connector}>
      <Button {...buttonProps}>
        <Trans>{(isConnected ? 'Disconnect' : 'Connect').toUpperCase()}</Trans>
      </Button>
    </div>
  );
};

export { Connector };