import { useEffect, useState, useCallback } from "react";
import { db } from "../utils/firebaseConfig";
import { collection, onSnapshot } from "firebase/firestore"; 
import { EventProfile } from "./useHostEvents";

const useGuestEvents = (userId: string) => {
  const [profiles, setProfiles] = useState<EventProfile[]>([]);
  const [slidesPerView, setSlidesPerView] = useState<number>(3);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const handleResize = useCallback(() => {
    if (window.innerWidth < 768) {
      setSlidesPerView(1); 
    } else if (window.innerWidth < 1024) {
      setSlidesPerView(2); 
    } else {
      setSlidesPerView(3); 
    }
  }, []);

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = onSnapshot(collection(db, "events"), (querySnapshot) => {
      const data: EventProfile[] = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as EventProfile));
      const filteredData = data.filter(profile => profile.userId !== userId);
      setProfiles(filteredData);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching events: ", error);
      setError("Error loading events. Please try again later.");
      setLoading(false);
    });

    return () => unsubscribe(); 
  }, [userId]);

  return { profiles, slidesPerView, loading, error };
};

export default useGuestEvents;
