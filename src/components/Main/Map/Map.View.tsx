import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import MapUpdater from './Map';

const customIcon = new L.Icon({
    iconUrl: 'https://png.pngtree.com/png-clipart/20230815/original/pngtree-map-red-pointer-icon-marker-vector-isolated-on-white-background-eps-10-picture-image_7977947.png',
    iconSize: [40, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
});

interface EventMapProps {
    lat: number;
    lng: number;
    location?: string;
}

const EventMap: React.FC<EventMapProps> = ({ lat, lng, location }) => {
    return (
        <MapContainer center={[lat, lng]} zoom={13} style={{ height: '300px', width: '100%' }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={[lat, lng]} icon={customIcon}>
                <Popup>{location}</Popup>
            </Marker>
            <MapUpdater lat={lat} lng={lng} />
        </MapContainer>
    );
};

export default EventMap;
