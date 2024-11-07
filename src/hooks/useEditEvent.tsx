
import { useState, useEffect } from 'react';
import { db } from '../utils/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import axios from 'axios';
import useUpdateEvent from './useUpdateEvent';

interface Coordinates {
  lat: number;
  lng: number;
}

const useEditEvent = (eventId: string, initialCoordinates: Coordinates) => {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [location, setLocation] = useState('');
  const [eventType, setEventType] = useState('');
  const [dressCode, setDressCode] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState(0);
  const [coordinates, setCoordinates] = useState<Coordinates>(initialCoordinates);
  const [isLocationUpdating, setIsLocationUpdating] = useState(false);
  const [isUpdateSuccessful, setIsUpdateSuccessful] = useState(false);  // Nuevo estado de éxito
  const { updateEvent, error } = useUpdateEvent();

  const fetchEvent = async () => {
    try {
      const eventDocRef = doc(db, 'events', eventId);
      const eventDocSnap = await getDoc(eventDocRef);
      if (eventDocSnap.exists()) {
        const eventData = eventDocSnap.data();
        setName(eventData.name || '');
        setDate(eventData.date || '');
        setStartTime(eventData.startTime || '');
        setLocation(eventData.location || '');
        setEventType(eventData.eventType || '');
        setDressCode(eventData.dressCode || '');
        setDescription(eventData.description || '');
        setAmount(eventData.amount || 0);
        setCoordinates({
          lat: eventData.coordinates?.lat || initialCoordinates.lat,
          lng: eventData.coordinates?.lng || initialCoordinates.lng,
        });
      }
    } catch (error) {
      console.error('Error fetching event data:', error);
    }
  };

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    const updatedData = { name, date, startTime, location, eventType, dressCode, description, amount, coordinates };
    try {
      await updateEvent(eventId, updatedData);
      setIsUpdateSuccessful(true);  // Actualización exitosa
    } catch (error) {
      console.error('Error updating event:', error);
    }
  };

  const handleLocationChange = async (value: string) => {
    setLocation(value);
    setIsLocationUpdating(true);
    try {
      const response = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(value)}`);
      const data = response.data;
      if (data && data.length > 0) {
        const { lat, lon } = data[0];
        setCoordinates({ lat: parseFloat(lat), lng: parseFloat(lon) });
      } else {
        console.error('No results found for this location.');
      }
    } catch (error) {
      console.error('Error fetching location:', error);
    } finally {
      setIsLocationUpdating(false);
    }
  };

  useEffect(() => {
    fetchEvent();
  }, [eventId]);

  return {
    name, setName,
    date, setDate,
    startTime, setStartTime,
    location, setLocation,
    eventType, setEventType,
    dressCode, setDressCode,
    description, setDescription,
    amount, setAmount,
    coordinates,
    isLocationUpdating,
    isUpdateSuccessful,  // Exportar el estado de éxito
    handleSubmitForm,
    handleLocationChange,
    error,
  };
};

export default useEditEvent;