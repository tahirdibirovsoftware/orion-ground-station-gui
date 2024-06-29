import { useState, useEffect, useRef, useContext } from 'react';
import style from './Cam.module.scss';
import { ThemeContext } from '@renderer/app/providers/ThemeProvider/ThemeProvider';
import { themeSetter } from '@renderer/shared/config/theme/model/themeSetter';

export const Cam = (): JSX.Element => {
  const { theme } = useContext(ThemeContext);
  const videoRef = useRef<HTMLVideoElement>(null);
  // const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState<string>('');

  const localStyles: React.CSSProperties = {
    ...themeSetter(theme)
  };

  const updateDeviceList = async ():Promise<void> => {
    try {
      const allDevices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = allDevices.filter(device => device.kind === 'videoinput');
      // setDevices(videoDevices);
      if (videoDevices.length > 1) {
        setSelectedDeviceId(videoDevices[1].deviceId);
      } else if (videoDevices.length > 0) {
        setSelectedDeviceId(videoDevices[0].deviceId);
      }
    } catch (err) {
      console.error('Error enumerating devices:', err);
    }
  };

  useEffect(() => {
    updateDeviceList();
    navigator.mediaDevices.addEventListener('devicechange', updateDeviceList);

    return () => {
      navigator.mediaDevices.removeEventListener('devicechange', updateDeviceList);
    };
  }, []);

  useEffect(() => {
    const startVideo = async ():Promise<void> => {
      if (selectedDeviceId) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: {
              deviceId: selectedDeviceId
            }
          });
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        } catch (err) {
          console.error('Error accessing the camera: ', err);
        }
      }
    };

    startVideo();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [selectedDeviceId]);

  return (
    <div style={localStyles} className={style.Cam}>
      <div className={style.streamContainer}>
        <video ref={videoRef} className="stream" autoPlay playsInline></video>
      </div>
      {/* <select
        className={style.camSelector}
        value={selectedDeviceId}
        onChange={(e) => setSelectedDeviceId(e.target.value)}
      >
        {devices.map(device => (
          <option key={device.deviceId} value={device.deviceId}>
            {device.label || `Camera ${device.deviceId}`}
          </option>
        ))}
      </select> */}
    </div>
  );
};