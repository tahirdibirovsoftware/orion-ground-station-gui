import { useEffect, useRef, useContext, useState } from 'react';
import style from './Cam.module.scss';
import { ThemeContext } from '@renderer/app/providers/ThemeProvider/ThemeProvider';
import { themeSetter } from '@renderer/shared/config/theme/themeSetter';

export const Cam = (): JSX.Element => {
  const { theme } = useContext(ThemeContext);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  const localStyles: React.CSSProperties = {
    ...themeSetter(theme)
  };

  const startVideo = async ():Promise<void> => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setStream(stream);
    } catch (err) {
      console.error('Error accessing the camera: ', err);
    }
  };

  const stopVideo = ():void => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  useEffect(() => {
    const handleDeviceChange = ():void => {
      stopVideo();
      startVideo();
    };

    navigator.mediaDevices.addEventListener('devicechange', handleDeviceChange);

    startVideo();

    return () => {
      navigator.mediaDevices.removeEventListener('devicechange', handleDeviceChange);
      stopVideo();
    };
  }, []);

  return (
    <div style={localStyles} className={style.Cam}>
      <video ref={videoRef} className="stream" autoPlay playsInline></video>
    </div>
  );
};
