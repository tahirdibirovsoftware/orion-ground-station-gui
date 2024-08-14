/* eslint-disable react/prop-types */
import React, { useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, useMap, MapContainerProps } from 'react-leaflet';
import L from "leaflet";
import { useAppSelector } from '@renderer/app/redux/hooks';
import { ThemeContext } from '@renderer/app/providers/ThemeProvider/ThemeProvider';
import { themeSetter } from '@renderer/shared/config/theme/model/themeSetter';
import style from './Map.module.scss';
import 'leaflet/dist/leaflet.css';
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

type Coordinate = [number, number];

interface MapProps {
  getGpsData: () => Coordinate | undefined;
}

interface MoveMapCenterProps {
  position: Coordinate;
}

const MoveMapCenter: React.FC<MoveMapCenterProps> = React.memo(({ position }) => {
  const map = useMap();
  useEffect(() => {
    if (map && position && position.length === 2) {
      map.setView(position);
    }
  }, [position, map]);
  return null;
});

MoveMapCenter.displayName = 'MoveMapCenter';

const isValidPosition = (pos: Coordinate | undefined): pos is Coordinate => {
  return Array.isArray(pos) && pos.length === 2 && typeof pos[0] === 'number' && typeof pos[1] === 'number' && !isNaN(pos[0]) && !isNaN(pos[1]);
};

// Default coordinate to use when no valid position is available
const DEFAULT_COORDINATE: Coordinate = [0, 0];

export const Map: React.FC<MapProps> = React.memo(({ getGpsData }) => {
  const { theme } = useContext(ThemeContext);
  const [currentPosition, setCurrentPosition] = useState<Coordinate | undefined>(undefined);
  const [positionHistory, setPositionHistory] = useState<Coordinate[]>([]);

  const localStyles = useMemo(() => themeSetter(theme || 'light'), [theme]);

  const updatePosition = useCallback(() => {
    const newPosition = getGpsData();
    if (isValidPosition(newPosition) && newPosition[0] !== 0 && newPosition[1] !== 0) {
      setCurrentPosition(newPosition);
      setPositionHistory(prevHistory => [...prevHistory, newPosition]);
    }
  }, [getGpsData]);

  useEffect(() => {
    const intervalId = setInterval(updatePosition, 0);
    return () => clearInterval(intervalId);
  }, [updatePosition]);

  const flightData = useAppSelector(state => state.flightDataStoreReducer);
  const isActive = useMemo(() => {
    const lastData = flightData[flightData.length - 1];
    return lastData && lastData.packetNumber > 0;
  }, [flightData]);

  if (!isActive || !isValidPosition(currentPosition)) {
    return <div style={localStyles} className={style.MapWrapper} />;
  }

  const mapContainerProps: MapContainerProps = {
    center: currentPosition || DEFAULT_COORDINATE,
    zoom: 5,
    style: { height: '100vh', width: '100%' }
  };

  return (
    <div style={localStyles} className={style.MapWrapper}>
      <MapContainer {...mapContainerProps}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {currentPosition && <Marker position={currentPosition} />}
        {positionHistory.length > 1 && <Polyline positions={positionHistory} color="blue" />}
        {currentPosition && <MoveMapCenter position={currentPosition} />}
      </MapContainer>
    </div>
  );
});

Map.displayName = 'Map';