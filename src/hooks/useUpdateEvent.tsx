import { useState } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../utils/firebaseConfig';
import { LeafletMouseEvent } from 'leaflet';

const useUpdateEvent = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lat, setLat] = useState<number>(3.405); // Valor predeterminado
  const [lng, setLng] = useState<number>(-76.49); // Valor predeterminado
  const [mapClicked, setMapClicked] = useState<boolean>(false);

  const updateEvent = async (eventId: string, updatedData: any) => {
    if (!eventId) {
      console.error('No se proporcionó un eventId válido.');
      setError('No se proporcionó un eventId válido.');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const eventDocRef = doc(db, 'events', eventId);
      await updateDoc(eventDocRef, updatedData);
      console.log('Evento actualizado correctamente');
    } catch (err) {
      console.error('Error updating event:', err);
      setError('Error al actualizar el evento.');
    } finally {
      setLoading(false);
    }
  };

  const onMapClick = (event: LeafletMouseEvent) => {
    const { lat, lng } = event.latlng;
    setLat(lat);
    setLng(lng);
    setMapClicked(true);
  };

  return { updateEvent, loading, error, onMapClick, lat, lng, mapClicked };
};

export default useUpdateEvent;