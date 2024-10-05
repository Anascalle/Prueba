import React, { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../utils/firebaseConfig';
import BackBtn from "./BackBtn/BackBtn.view";
import InfoCard from "./InfoCard/InfoCard.view";
import "./MapInfo.css";

interface MapInformationProps {
    eventId: string;
}

interface EventInfo {
    name: string;
    image: string;
    host: string;
    eventType: string;
    dressCode: string;
    date: string;
    startTime: string;
    location: string;
    description: string;
}

const MapInformation: React.FC<MapInformationProps> = ({ eventId }) => {
    const [eventInfo, setEventInfo] = useState<EventInfo | null>(null);

    useEffect(() => {
        const fetchEventDetails = async () => {
        const docRef = doc(db, "events", eventId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log('Event data:', docSnap.data());
            setEventInfo(docSnap.data() as EventInfo); 
        } else {
            console.log("No such document!");
        }
        };

        fetchEventDetails();
    }, [eventId]);

    if (!eventInfo) {
        return <p>Loading event details...</p>;
    }

    return (
        <div className="MapInfo">
        <BackBtn NameEvent={eventInfo.name}  />
        <InfoCard
            img={eventInfo.image}
            NameEvent={eventInfo.name}
            Host={eventInfo.host}
            EventType={eventInfo.eventType}
            DressCode={eventInfo.dressCode}
            Date={eventInfo.date}
            StartTime={eventInfo.startTime}
            Location={eventInfo.location}
            Description={eventInfo.description}
            
        />
        </div>
    );
    };

export default MapInformation;