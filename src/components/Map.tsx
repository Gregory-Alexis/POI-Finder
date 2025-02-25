import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Icon } from 'leaflet';
import markerIconPng from 'leaflet/dist/images/marker-icon.png';
import { useGeolocation } from '../hook/useGeolocation';

const RecenterAutomatically = ({ lat, lon }: { lat: number; lon: number }) => {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lon]);
  }, [lat, lon, map]);
  return null;
};

const Map = ({ places }: { places: any[] }) => {
  const { position } = useGeolocation();
  const defaultPosition: [number, number] = [48.8566, 2.3522];

  return (
    <MapContainer center={defaultPosition} zoom={13} style={{ height: '80vh', width: '100%' }}>
      <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />

      {position && (
        <>
          <RecenterAutomatically lat={position.lat} lon={position.lon} />
          <Marker
            position={[position.lat, position.lon]}
            icon={
              new Icon({
                iconUrl: markerIconPng,
                iconSize: [25, 41],
                iconAnchor: [12, 41],
              })
            }
          >
            <Popup>Your current position 📍</Popup>
          </Marker>
        </>
      )}

      {places.map((place) => (
        <Marker
          key={place.id}
          position={[place.lat, place.lon]}
          icon={
            new Icon({
              iconUrl: markerIconPng,
              iconSize: [25, 41],
              iconAnchor: [12, 41],
            })
          }
        >
          <Popup>{place.display_name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;
