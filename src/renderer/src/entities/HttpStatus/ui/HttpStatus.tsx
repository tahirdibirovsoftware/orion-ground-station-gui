import { memo, useLayoutEffect, useState } from 'react';
import { CloudSyncOutlined } from '@ant-design/icons';
import style from './HttpStatus.module.scss';

const HTTPStatusComponent = (): JSX.Element => {
  type ISync = "#00ff00" | "#ff0000";

  const [isSync, setIsSync] = useState<boolean>(false);
  const getColor = (): ISync => isSync ? "#00ff00" : "#ff0000";



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