import React, { useState, useEffect, useRef, useContext, useCallback } from 'react';
import style from './Cam.module.scss';
import { ThemeContext } from '@renderer/app/providers/ThemeProvider/ThemeProvider';
import { themeSetter } from '@renderer/shared/config/theme/model/themeSetter';

export const Cam: React.FC = () => {
  const { theme } = useContext(ThemeContext);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [selectedDeviceId, setSelectedDeviceId] = useState<string>('');

  const localStyles = React.useMemo(() => themeSetter(theme), [theme]);

  const updateDeviceList = useCallback(async () => {
    try {
      const allDevices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = allDevices.filter(device => device.kind === 'videoinput');
      if (videoDevices.length > 1) {
        setSelectedDeviceId(videoDevices[1].deviceId);
      } else if (videoDevices.length > 0) {
        setSelectedDeviceId(videoDevices[0].deviceId);
      }
    } catch (err) {
      console.error('Error enumerating devices:', err);
    }
  }, []);

  const startVideo = useCallback(async () => {
    if (selectedDeviceId && videoRef.current) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { deviceId: selectedDeviceId }
        });
        videoRef.current.srcObject = stream;
      } catch (err) {
        console.error('Error accessing the camera: ', err);
      }
    }
  }, [selectedDeviceId]);

  useEffect(() => {
    updateDeviceList();
    navigator.mediaDevices.addEventListener('devicechange', updateDeviceList);

    return () => {
      navigator.mediaDevices.removeEventListener('devicechange', updateDeviceList);
    };
  }, [updateDeviceList]);

  useEffect(() => {
    startVideo();

    return () => {
      if (videoRef.current?.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [startVideo]);

  return (
    <div style={localStyles} className={style.Cam}>
      <div className={style.streamContainer}>
        <video ref={videoRef} className="stream" autoPlay playsInline />
      </div>
    </div>
  );
};