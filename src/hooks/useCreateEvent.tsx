import { useState, useMemo } from 'react';
import { LeafletMouseEvent } from 'leaflet';
import { collection, addDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db} from '../utils/firebaseConfig';
import { getAuth } from 'firebase/auth';
import axios from 'axios';

const useCreateEventForm = () => {
    const [eventId, setEventId] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [date, setDate] = useState<string>('');
    const [startTime, setStartTime] = useState<string>('');
    const [location, setLocation] = useState<string>('');
    const [eventType, setEventType] = useState<string>('');
    const [dressCode, setDressCode] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [lat, setLat] = useState<number>(3.405);
    const [lng, setLng] = useState<number>(-76.49);
    const [mapClicked, setMapClicked] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [image, setEventImage] = useState<string | null>(null);
    const [amount, setAmount] = useState<number>(0);

    const eventImages = useMemo<Record<string, string>>(() => ({
        Halloween: 'https://firebasestorage.googleapis.com/v0/b/programacion-ec39e.appspot.com/o/EventsProfImage%2FHalloween.webp?alt=media&token=60a5ef71-06d5-424a-9769-a00cfbb4a4a2',
        Birthday: 'https://firebasestorage.googleapis.com/v0/b/programacion-ec39e.appspot.com/o/EventsProfImage%2FHappyBirthday.webp?alt=media&token=6902ad3e-c943-45e4-a355-ebd0a63acc39',
        "Baby shower": 'https://firebasestorage.googleapis.com/v0/b/programacion-ec39e.appspot.com/o/EventsProfImage%2Fbaby-shower-1.webp?alt=media&token=88aff7ae-4e95-4902-b8f3-0235dfcce888',
        Wedding: "https://firebasestorage.googleapis.com/v0/b/programacion-ec39e.appspot.com/o/EventsProfImage%2FWedding.webp?alt=media&token=7e54d790-a151-4863-8dc4-1f2894748c46",
        Christmas: 'https://firebasestorage.googleapis.com/v0/b/programacion-ec39e.appspot.com/o/EventsProfImage%2FNavidad.webp?alt=media&token=eb85b70d-cf4c-4a50-b62a-54fff05ca922',
        Other: 'https://firebasestorage.googleapis.com/v0/b/programacion-ec39e.appspot.com/o/EventsProfImage%2FFiesta.webp?alt=media&token=09a1359c-42cc-43f4-921a-db5446cbfca9',

}), []);

const handleEventTypeChange = (eventType: string) => {
    setEventType(eventType);
    setEventImage(eventImages[eventType] || null);
};

const handleAddressChange = async (address: string) => {
    setLocation(address);
    
    const geocodeUrl = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&limit=1`;

    try {
        const response = await axios.get(geocodeUrl);
        if (response.data.length > 0) {
            const { lat, lon } = response.data[0];
            setLat(parseFloat(lat));
            setLng(parseFloat(lon));
            setMapClicked(true); 
        } else {
            alert("Location not found. Please try a different address.");
        }
    } catch (error) {
        console.error("Error fetching location:", error);
        alert("An error occurred while fetching the location.");
    }
};

const closeModal = () => {
    setIsModalOpen(false); 
};

const generateUniqueID = (): string => {
    return `event-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
};

const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); 

    const generatedId = generateUniqueID(); 
    setEventId(generatedId); 

    if (!mapClicked) {
        alert("Please set the location on the map.");
        return;
    }

    if (!name || !date || !startTime || !location || !eventType || !dressCode || !description) {
        alert("Please complete all the required fields.");
        return;
    }

    if (amount < 0) {
        alert("Amount cannot be negative.");
        return;
    }

    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
        alert("User not authenticated.");
        return;
    }

    const userRef = doc(db, "users", user.uid);
    try {
        const userDoc = await getDoc(userRef);
        if (!userDoc.exists()) {
            alert("User data not found.");
            return;
        }

        const userData = userDoc.data();
        const currentAccountAmount = userData.accountAmount;

        if (amount !== undefined && currentAccountAmount < amount) {
            alert("Insufficient funds.");
            return;
        }

        const newAccountAmount = amount !== undefined ? currentAccountAmount - amount : currentAccountAmount;

        if (amount !== undefined) {
            await updateDoc(userRef, { accountAmount: newAccountAmount });
        }

        const eventData = {
            eventID: generatedId,  
            name,
            date,
            startTime,
            location,
            eventType,
            dressCode,
            description,
            userId: user.uid,
            coordinates: { lat, lng },
            image: image,
            amount: amount === undefined ? null : amount,
        };

        await addDoc(collection(db, "events"), eventData);
        
        resetForm(); 
        closeModal(); 

    } catch (error) {
        console.error("Error processing request: ", error);
        alert("An error occurred while creating the event.");
    }
};

const resetForm = () => {
    setName('');
    setDate('');
    setStartTime('');
    setLocation('');
    setEventType('');
    setDressCode('');
    setDescription('');
    setLat(3.405);
    setLng(-76.49);
    setMapClicked(false);
    setEventImage(null);
    setAmount(0);
    setEventId(''); 
};

const onMapClick = (event: LeafletMouseEvent) => {
    const { lat, lng } = event.latlng;
    setLat(lat);
    setLng(lng);
    setMapClicked(true);
};

const handleClose = () => {
    resetForm();
    setIsModalOpen(false);
};

const handleOpenModal = () => {
    setIsModalOpen(true);
};

return {
    eventId,
    name,
    setName,
    date,
    setDate,
    startTime,
    setStartTime,
    location,
    setLocation: handleAddressChange, 
    setEventType: handleEventTypeChange,
    dressCode,
    setDressCode,
    description,
    setDescription,
    eventType,
    handleSubmit,
    lat,
    lng,
    onMapClick,
    handleClose,
    handleOpenModal,
    isModalOpen,
    image,
    amount,
    setAmount,
};
}
export default useCreateEventForm;


