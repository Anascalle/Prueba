import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

interface MapUpdaterProps {
    lat: number;
    lng: number;
}

const MapUpdater: React.FC<MapUpdaterProps> = ({ lat, lng }) => {
    const map = useMap();
   
    useEffect(() => {
        map.setView([lat, lng]); 
    }, [lat, lng, map]);

    return null; 
};

export default MapUpdater;
