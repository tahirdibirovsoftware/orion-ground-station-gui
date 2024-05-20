/* eslint-disable react/prop-types */
import { themeSetter } from '@renderer/shared/config/theme/themeSetter';
import style from './Map.module.scss';
import { useContext, useState, useEffect } from 'react';
import { ThemeContext } from '@renderer/app/providers/ThemeProvider/ThemeProvider';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { ExpandAltOutlined } from '@ant-design/icons';

interface MapProps {
  initialPosition: [number, number];
  getGpsData: () => [number, number]; // Function to get GPS data
}

const Map: React.FC<MapProps> = ({ initialPosition, getGpsData }) => {
  const { theme } = useContext(ThemeContext);
  const [currentPosition, setCurrentPosition] = useState<[number, number]>(initialPosition);

  const localStyles: React.CSSProperties = {
    ...themeSetter(theme),
  };

  // Custom hook to move the map center
  const MoveMapCenter = ({ position }: { position: [number, number] }):null => {
    const map = useMap();
    useEffect(() => {
      map.setView(position);
    }, [position, map]);
    return null;
  };

  useEffect(() => {
    const updatePosition = () :void=> {
      const newPosition = getGpsData();
      setCurrentPosition(newPosition);
    };

    // Update position at regular intervals (e.g., every 5 seconds)
    const intervalId = setInterval(updatePosition, 0);

    return () => clearInterval(intervalId); // Clean up on unmount
  }, [getGpsData]);

  return (
    <div style={localStyles} className={style.MapWrapper}>
      <MapContainer center={currentPosition} zoom={5} style={{ height: '100vh', width: '100%' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={currentPosition} />
        <MoveMapCenter position={currentPosition} />
      </MapContainer>
      <div className={style.zoomButton}>
      <ExpandAltOutlined />
      </div>
    </div>
  );
};

export { Map };
