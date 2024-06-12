/* eslint-disable react/prop-types */
import { themeSetter } from '@renderer/shared/config/theme/themeSetter';
import style from './Map.module.scss';
import { useContext, useState, useEffect } from 'react';
import { ThemeContext } from '@renderer/app/providers/ThemeProvider/ThemeProvider';
import { MapContainer, TileLayer, Marker, Polyline, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
// import { ExpandAltOutlined } from '@ant-design/icons';
import { useAppSelector } from '@renderer/app/redux/hooks';
import icon from "leaflet/dist/images/marker-icon.png";
import L from "leaflet";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

interface MapProps {
  getGpsData: () => [number, number]; // Function to get GPS data
}

const Map: React.FC<MapProps> = ({ getGpsData }) => {
  const { theme } = useContext(ThemeContext);
  const [currentPosition, setCurrentPosition] = useState<[number, number]>();
  const [positionHistory, setPositionHistory] = useState<[number, number][]>([]);

  const localStyles: React.CSSProperties = {
    ...themeSetter(theme),
  };

  // Custom hook to move the map center
  const MoveMapCenter = ({ position }: { position: [number, number] }): null => {
    const map = useMap();
    useEffect(() => {
      map.setView(position);
    }, [position, map]);
    return null;
  };

  useEffect(() => {
    const updatePosition = () :void=> {
      const newPosition = getGpsData();
      if (newPosition[0] !== 0 && newPosition[1] !== 0) {
        setCurrentPosition(newPosition);
        setPositionHistory(prevHistory => [...prevHistory, newPosition]);
      }
    };

    // Update position at regular intervals (e.g., every 5 seconds)
    const intervalId = setInterval(updatePosition, 0);

    return () => clearInterval(intervalId); // Clean up on unmount
  }, [getGpsData]);

  const flightData = useAppSelector(state => state.flightDataStoreReducer);
  const isActive = flightData[flightData.length - 1].packetNumber > 0;

  return (
    <div style={localStyles} className={style.MapWrapper}>
      {isActive && currentPosition && (
        <>
          <MapContainer center={currentPosition} zoom={5} style={{ height: '100vh', width: '100%' }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={currentPosition} />
            <Polyline positions={positionHistory} color="blue" />
            <MoveMapCenter position={currentPosition} />
          </MapContainer>
        </>
      )}
       {/* <div className={style.zoomButton}>
            <ExpandAltOutlined />
          </div> */}
    </div>
  );
};

export { Map };
