import React, {useEffect} from 'react';
import "./EditEvent.css";
import EventMap from "../Map/Map.View";
import useEditEvent from '../../../hooks/useEditEvent';



interface EeditEventViewProps {
  eventId: string;
  name: string;
  setName: (value: string) => void;
  date: string;
  setDate: (value: string) => void;
  startTime: string;
  setStartTime: (value: string) => void;
  location: string;
  setLocation: (value: string) => void;
  eventType: string;
  setEventType: (value: string) => void;
  dressCode: string;
  setDressCode: (value: string) => void;
  description: string;
  setDescription: (value: string) => void;
  
  lat: number;
  lng: number;
  amount: number;
  setAmount: (value: number) => void;
  onMapClick: (event: any) => void;
  onClose: () => void;
 
}
const EeditEventView: React.FC<EeditEventViewProps> = ({ eventId, lat, lng, onClose }) => {
  const {
    name, setName,
    date, setDate,
    startTime, setStartTime,
    location,
    eventType, setEventType,
    dressCode, setDressCode,
    description, setDescription,
    amount, setAmount,
    coordinates,
    isLocationUpdating,
    handleSubmitForm,
    handleLocationChange,
    error,
    isUpdateSuccessful,
  } = useEditEvent(eventId, { lat, lng });

  // Cierra el modal o muestra una alerta si la actualización fue exitosa
  useEffect(() => {
    if (isUpdateSuccessful) {
      alert("Evento actualizado correctamente.");
      onClose();
    }
  }, [isUpdateSuccessful, onClose]);


  return (
    <div aria-label="edit events form" className="edit_event_form">
      <button className="close-button" onClick={onClose}>x</button>
      <h2>Update an Event</h2>
      <form onSubmit={handleSubmitForm}>
        <label>Event name</label>
        <input
          aria-label="event name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Event name"
          required
        />
        <label>Date</label>
        <input
          aria-label="event date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <label>Start time</label>
        <input
          aria-label="start time"
          type="time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          required
        />
        <p className="example">Example: Cl. 38 Norte. #6N</p>
        <input
          aria-label="address"
          type="text"
          value={location}
          onChange={(e) => handleLocationChange(e.target.value)}
          placeholder="Address"
          required
        />
        {isLocationUpdating && <p>Loading location...</p>}
        <EventMap lat={coordinates.lat} lng={coordinates.lng} location={location} />

        <label>Event type</label>
        <select
          aria-label="event type"
          value={eventType}
          onChange={(e) => setEventType(e.target.value)}
          required
        >
          <option value="" disabled>Select an event type</option>
          <option value="Halloween">Halloween</option>
          <option value="Wedding">Wedding</option>
          <option value="Birthday">Birthday</option>
          <option value="Baby shower">Baby shower</option>
          <option value="Christmas">Christmas</option>
          <option value="Other">Other</option>
        </select>
        <label>Dress code</label>
        <input
          aria-label="dress code"
          type="text"
          value={dressCode}
          onChange={(e) => setDressCode(e.target.value)}
          placeholder="Dress code"
          required
        />
        <label>Description</label>
        <textarea
          aria-label="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          required
        ></textarea>
        <label>Event amount</label>
        <input
          aria-label="event amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          placeholder="Event amount"
        />
        <button type="submit">Update event</button>
      </form>
      {error && <p>Error updating event: {error}</p>}
    </div>
  );
};

export default EeditEventView;