import { FC, useEffect } from 'react';
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
  useTranslation()
  const dispatch = useAppDispatch();
  const isConnected = useAppSelector(
    (state) => type === 'flight' ? state.connectorReducer.flightConnect : state.connectorReducer.iotConnect
  ) === 'connected';
  const flightBaudRate = useAppSelector((state) => state.baudRateReducer.flightBaudRate);
  const iotBaudRate = useAppSelector((state) => state.baudRateReducer.iotBaudRate);
  const flightPath = useAppSelector((state) => state.portConfigReducer.flightPath);
  const iotPath = useAppSelector((state) => state.portConfigReducer.iotPath);

  const flightDataHandler = (data: ITelemetry): void => { dispatch(addTelemetry(data)); };
  const iotDataHandler = (data: IIoTTelemetry): void => { dispatch(addIotData(data)); };
  const isIoTReady = Boolean(iotPath);
  const isFlightReady = Boolean(flightPath);
  const isAvailable = (): boolean => type === 'flight' ? isFlightReady : isIoTReady;

  useEffect(() => {
    if (type === 'flight' && !flightPath) {
      dispatch(connectToFlight('disconnected'));
    }
    if (type === 'iot' && !iotPath) {
      dispatch(connectToIoT('disconnected'));
    }
  }, [dispatch, type, flightPath, iotPath]);

  const connectHandler = (): void => {
    if (type === 'flight') {
      window.api.connectToFlight(flightPath, Number(flightBaudRate));
      window.api.getFlightData(flightDataHandler);
      dispatch(connectToFlight('connected'));
    } else if (type === 'iot') {
      window.api.connectToIot(iotPath, iotBaudRate);
      window.api.getIotData(iotDataHandler);
      dispatch(connectToIoT('connected'));
    }
  };

  const disconnectHandler = (): void => {
    if (type === 'flight') {
      window.api.disconnectFlight(flightPath);
      dispatch(connectToFlight('disconnected'));
      dispatch(resetTelemetry());
    } else if (type === 'iot') {
      window.api.disconnectIot(iotPath);
      dispatch(connectToIoT('disconnected'));
      dispatch(resetIotTelemetryData());
    }
  };

  return (
    <div className={style.Connector}>
      {(!isConnected) ? (
        <Button disabled={!isAvailable()} style={!isAvailable() ? { opacity: .3, cursor: 'default' } : {}} onClick={connectHandler} size="small" type="text" className={style.ButtonConnect}>
          <Trans>{'Connect'.toUpperCase()}</Trans>
        </Button>
      ) : (
        <Button onClick={disconnectHandler} size="small" type="text" className={style.ButtonDisconnect}>
          <Trans>{'Disconnect'.toUpperCase()}</Trans>
        </Button>
      )}
    </div>
  );
};

export { Connector };
