import React, { useState, useEffect, useRef, useContext, useCallback } from 'react';
import style from './Cam.module.scss';
import { ThemeContext } from '@renderer/app/providers/ThemeProvider/ThemeProvider';
import { themeSetter } from '@renderer/shared/config/theme/model/themeSetter';
import { ALL_BORDERS } from '@renderer/shared/config/theme/constants';
import { VideoCameraOutlined } from '@ant-design/icons';

export const Cam: React.FC = () => {
  const { theme } = useContext(ThemeContext);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [selectedDeviceId, setSelectedDeviceId] = useState<string | null>(null);
  const [usbCameraFound, setUsbCameraFound] = useState<boolean>(false);

  const localStyles = React.useMemo(() => themeSetter(theme, ALL_BORDERS, [10, 5, 15, 0]), [theme]);

  const updateDeviceList = useCallback(async () => {
    try {
      const allDevices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = allDevices.filter(device => device.kind === 'videoinput');

      // Find USB camera (usually not the first device)
      const usbCamera = videoDevices.find((_, index) => index > 0);

      if (usbCamera) {
        setSelectedDeviceId(usbCamera.deviceId);
        setUsbCameraFound(true);
      } else {
        setSelectedDeviceId(null);
        setUsbCameraFound(false);
      }
    } catch (err) {
      console.error('Error enumerating devices:', err);
      setUsbCameraFound(false);
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
        setUsbCameraFound(false);
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
    if (usbCameraFound) {
      startVideo();
    } else if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }

    return () => {
      if (videoRef.current?.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [startVideo, usbCameraFound]);

  return (
    <div style={localStyles} className={style.Cam}>
      <div className={style.streamContainer}>
        {usbCameraFound ? (
          <video ref={videoRef} className="stream" autoPlay playsInline />
        ) : (
          <div className={style.noUsbCamera}>
            <VideoCameraOutlined />
          </div>
        )}
      </div>
    </div>
  );
};