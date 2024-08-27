import { useEffect, useState } from 'react';
import { CloudSyncOutlined } from '@ant-design/icons';
import style from './HttpStatus.module.scss';

const HTTPStatus = (): JSX.Element => {
  type ISync = "green" | "red";

  const [isSync, setIsSync] = useState<boolean>(false);
  const getColor = (): ISync => isSync ? "green" : "red";

  const checkConnection = async (): Promise<void> => {
    try {
      const startTime = Date.now();
      const response = await fetch('https://orion-server-oek4.onrender.com/api/telemetry');
      const endTime = Date.now();
      const duration = endTime - startTime;

      if (response.status === 200 && duration <= 30000) {
        setIsSync(true);
      } else {
        setIsSync(false);
      }
    } catch (error) {
      console.error('Connection check failed:', error);
      setIsSync(false);
    }
  };

  useEffect(() => {
    // Initial check
    checkConnection();

    // Set up interval for periodic checks
    const intervalId = setInterval(checkConnection, 5 * 60 * 1000); // 5 minutes in milliseconds

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className={style.HttpStatus}>
      <CloudSyncOutlined style={{ color: getColor() }} />
    </div>
  );
};

export { HTTPStatus };