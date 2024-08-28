import { memo, useLayoutEffect, useState } from 'react';
import { CloudSyncOutlined } from '@ant-design/icons';
import style from './HttpStatus.module.scss';

const HTTPStatusComponent = (): JSX.Element => {
  type ISync = "green" | "red";

  const [isSync, setIsSync] = useState<boolean>(false);
  const getColor = (): ISync => isSync ? "green" : "red";



  useLayoutEffect(() => {
  
    window.api.getNetworkState(setIsSync)

  }, []);

  return (
    <div className={style.HttpStatus}>
      <CloudSyncOutlined style={{ color: getColor() }} />
    </div>
  );
};

export const HTTPStatus = memo(HTTPStatusComponent);