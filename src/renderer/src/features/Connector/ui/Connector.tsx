import { FC } from 'react';
import style from './Connector.module.scss';
import { IConnector } from '../model/types';
import { Button } from 'antd';
import { useAppDispatch, useAppSelector } from '@renderer/app/redux/hooks';
import { connectToFlight, connectToIoT } from '../model/connectorSlice';
import { addTelemetry } from '@renderer/widgets/DataController/model/dataStoreSlice';

const Connector: FC<IConnector> = ({ type }): JSX.Element => {
  const dispatch = useAppDispatch();
  const isConnected = useAppSelector(
    (state) => type === 'flight' ? state.connectorReducer.flightConnect : state.connectorReducer.iotConnect
  ) === 'connected';
  const flightBaudRate = useAppSelector((state) => state.baudRateReducer.flightBaudRate);
  const iotBaudRate = useAppSelector((state) => state.baudRateReducer.iotBaudRate);
  const flightPath = useAppSelector((state) => state.portConfigReducer.flightPath);
  const iotPath = useAppSelector((state) => state.portConfigReducer.iotPath);

  const dataHandler = (data) => dispatch(addTelemetry(data));

  const connectHandler = (): void => {
    if (type === 'flight') {
      window.api.connectToFlight(flightPath, Number(flightBaudRate));
      window.api.getFlightData(dataHandler);
      dispatch(connectToFlight('connected'));
    } else if (type === 'iot') {
        window.api.disconnectFlight()
      dispatch(connectToIoT('connected'));
    }
  };

  const disconnectHandler = (): void => {
    if (type === 'flight') {
      dispatch(connectToFlight('disconnected'));
    } else if (type === 'iot') {
      dispatch(connectToIoT('disconnected'));
    }
  };

  return (
    <div className={style.Connector}>
      {!isConnected ? (
        <Button onClick={connectHandler} size="small" type="text" className={style.ButtonConnect}>
          {'Connect'.toUpperCase()}
        </Button>
      ) : (
        <Button onClick={disconnectHandler} size="small" type="text" className={style.ButtonDisconnect}>
          {'Disconnect'.toUpperCase()}
        </Button>
      )}
    </div>
  );
};

export { Connector };
