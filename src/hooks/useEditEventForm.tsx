import { useState, useEffect } from 'react';
import { LeafletMouseEvent } from 'leaflet';
import useUpdateEvent from './useUpdateEvent';
 
const useEditEventForm = (eventId: string) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [location, setLocation] = useState('');
  const [eventType, setEventType] = useState('');
  const [dressCode, setDressCode] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState<number | null>(null);
  const [lat, setLat] = useState<number>(3.405);
  const [lng, setLng] = useState<number>(-76.49);
  const [mapClicked, setMapClicked] = useState<boolean>(false);
  const [imageSrc, setImageSrc] = useState<string>(''); 

  const { updateEvent, loading, error } = useUpdateEvent(); // Llama al hook aquí

  const handleOpenModal = () => setIsModalOpen(true);
  const handleClose = () => setIsModalOpen(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const updatedData = {
    eventId,
      name,
      date,
      startTime,
      location,
      eventType,
      dressCode,
      description,
      amount,
      coordinates: { lat, lng },
    };

    await updateEvent(eventId, updatedData); // Llama a updateEvent aquí
    handleClose();
  };

  const onMapClick = (event: LeafletMouseEvent) => {
    const { lat, lng } = event.latlng;
    setLat(lat);
    setLng(lng);
    setMapClicked(true);
  };
  useEffect(() => {
    switch (eventType) {
      case 'Halloween':
        setImageSrc('https://firebasestorage.googleapis.com/v0/b/programacion-ec39e.appspot.com/o/EventsProfImage%2FHalloween.webp?alt=media&token=60a5ef71-06d5-424a-9769-a00cfbb4a4a2');
        break;
      case 'Birthday':
        setImageSrc('https://firebasestorage.googleapis.com/v0/b/programacion-ec39e.appspot.com/o/EventsProfImage%2FHappyBirthday.webp?alt=media&token=6902ad3e-c943-45e4-a355-ebd0a63acc39');
        break;
      case 'Wedding':
        setImageSrc('https://firebasestorage.googleapis.com/v0/b/programacion-ec39e.appspot.com/o/EventsProfImage%2FWedding.webp?alt=media&token=7e54d790-a151-4863-8dc4-1f2894748c46');
        break;
        case 'Christmas':
          setImageSrc('https://firebasestorage.googleapis.com/v0/b/programacion-ec39e.appspot.com/o/EventsProfImage%2FNavidad.webp?alt=media&token=eb85b70d-cf4c-4a50-b62a-54fff05ca922');
          break;
        case 'Baby shower':
          setImageSrc('https://firebasestorage.googleapis.com/v0/b/programacion-ec39e.appspot.com/o/EventsProfImage%2Fbaby-shower-1.webp?alt=media&token=88aff7ae-4e95-4902-b8f3-0235dfcce888');
          break;
        case 'Other':
          setImageSrc('https://firebasestorage.googleapis.com/v0/b/programacion-ec39e.appspot.com/o/EventsProfImage%2FFiesta.webp?alt=media&token=09a1359c-42cc-43f4-921a-db5446cbfca9');
          break;
      default:
        setImageSrc('https://firebasestorage.googleapis.com/v0/b/programacion-ec39e.appspot.com/o/EventsProfImage%2FFiesta.webp?alt=media&token=09a1359c-42cc-43f4-921a-db5446cbfca9');
        break;
    }
  }, [eventType]);

  return {
    eventId,
    name,
    setName,
    date,
    setDate,
    startTime,
    setStartTime,
    location,
    setLocation,
    eventType,
    setEventType,
    dressCode,
    setDressCode,
    description,
    setDescription,
    handleSubmit,
    loading,
    error,
    lat,
    setLat,
    lng,
    setLng,
    amount,
    setAmount,
    isModalOpen,
    handleOpenModal,
    handleClose,
    mapClicked,
    onMapClick,
    imageSrc
  };
};

export default useEditEventForm;