import { useState, useMemo } from 'react';
import { LeafletMouseEvent } from 'leaflet';
import { collection, addDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../utils/firebaseConfig';
import { getAuth } from 'firebase/auth';
import axios from 'axios';

const useCreateEventForm = () => {
    const [name, setName] = useState<string>('');
    const [date, setDate] = useState<string>('');
    const [startTime, setStartTime] = useState<string>('');
    const [location, setLocation] = useState<string>('');
    const [eventType, setEventType] = useState<string>('');
    const [dressCode, setDressCode] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [lat, setLat] = useState<number>(3.405); // Valor predeterminado
    const [lng, setLng] = useState<number>(-76.49); // Valor predeterminado
    const [mapClicked, setMapClicked] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [eventImage, setEventImage] = useState<string | null>(null);
    const [amount, setAmount] = useState<number>(0);

    const eventImages = useMemo<Record<string, string>>(() => ({
        Halloween: 'https://firebasestorage.googleapis.com/v0/b/programacion-ec39e.appspot.com/o/162fae60-77df-11ee-bd0d-2d70b013b479.jpg.webp?alt=media&token=657d353c-98b6-4826-94b1-3ef021510c0e',
        Birthday: 'https://firebasestorage.googleapis.com/v0/b/programacion-ec39e.appspot.com/o/septiembre-cumpleanos-655x368.webp?alt=media&token=9374ce7f-cf85-4cda-8a9b-8d52ca80f0e1',
        "Baby shower": 'https://firebasestorage.googleapis.com/v0/b/programacion-ec39e.appspot.com/o/e53d5867ba9718bd7626f70f2ff446f3.webp?alt=media&token=283fad8c-d887-421a-8e37-3c9c3044b8f5',
        Wedding: "https://firebasestorage.googleapis.com/v0/b/programacion-ec39e.appspot.com/o/unnamed-min.webp?alt=media&token=b4c33a4f-b720-47a8-b4f5-c5ddc028625e",
        Christmas: 'https://firebasestorage.googleapis.com/v0/b/programacion-ec39e.appspot.com/o/S7H7HDZF2RJ7RJ3FYMDU5QFSQ4.webp?alt=media&token=9c5c1ce5-7293-4d20-a7fc-216049acbef0',
        Other: 'https://firebasestorage.googleapis.com/v0/b/programacion-ec39e.appspot.com/o/amigos-tintinean-vasos-bebida-bar-moderno_1150-18971.webp?alt=media&token=d0a0eb11-822c-49e4-8b10-8e18070be90e',
    }), []);

    const handleEventTypeChange = (eventType: string) => {
        setEventType(eventType);
        setEventImage(eventImages[eventType] || null);
    };

    const handleAddressChange = async (address: string) => {
        setLocation(address);
        
        // Realiza la búsqueda de coordenadas usando OpenStreetMap
        const geocodeUrl = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&limit=1`;

        try {
            const response = await axios.get(geocodeUrl);
            if (response.data.length > 0) {
                const { lat, lon } = response.data[0];
                setLat(parseFloat(lat));
                setLng(parseFloat(lon));
                setMapClicked(true); // Marcar que se hizo clic en el mapa
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
    
    const handleSubmit = async (e: any) => {
        e.preventDefault(); 
        console.log("Submitting event data...");

        if (!mapClicked) {
            alert("Please set the location on the map.");
            return;
        }

        if (!name || !date || !startTime || !location || !eventType || !dressCode || !description) {
            alert("Please complete all the required fields.");
            return;
        }

        console.log("Current amount:", amount);
        if (amount < 0) {
            alert("Amount cannot be negative.");
            return;
        }
    

        const auth = getAuth();
        const user = auth.currentUser;
        console.log("Current user:", user);

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
                name,
                date,
                startTime,
                location,
                eventType,
                dressCode,
                description,
                userId: user.uid,
                coordinates: { lat, lng },
                image: eventImage,
                amount: amount === undefined ? null : amount,
            };

            console.log("Event Data to be added:", eventData); 

            await addDoc(collection(db, "events"), eventData);
            
            resetForm(); 
            closeModal(); 

        } catch (error) {
            console.error("Error processing request: ", error);
            alert("An error occurred while creating the event.");
            return false;
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
        eventImage,
        amount,
        setAmount,
    };
};

export default useCreateEventForm;
