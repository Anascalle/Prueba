import { useEffect, useState, useMemo, useCallback } from "react";
import { db } from "../utils/firebaseConfig";
import { collection, query, where, onSnapshot, getDocs } from "firebase/firestore";

  export interface EventProfile {
  id: string; 
  userId:string;
  name: string;
  eventType: string;
  date: string;
  image: string;
}

const useHostEvents = (userId: string) => {
  const [profiles, setProfiles] = useState<EventProfile[]>([]); 
  const [loading, setLoading] = useState<boolean>(true); 
  const [error, setError] = useState<string | null>(null); 
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);  

  // Función para guardar datos en localStorage
  const saveToLocalStorage = (key: string, data: any) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  // Función para obtener datos desde localStorage
  const loadFromLocalStorage = (key: string) => {
    const savedData = localStorage.getItem(key);
    return savedData ? JSON.parse(savedData) : null;
  };

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);  

  const slidesPerView = useMemo(() => {
    if (windowWidth < 768) return 1;
    if (windowWidth < 1024) return 2;
    return 3;
  }, [windowWidth]); 

  const fetchData = useCallback(async () => {
    setLoading(true); // Iniciar estado de carga
    const eventsRef = collection(db, "events");
    const q = query(eventsRef, where("userId", "==", userId));

    // Verificar si los datos ya están en localStorage
    const cachedData = loadFromLocalStorage(`events_${userId}`);
    if (cachedData) {
      setProfiles(cachedData); 
    }

    try {
      // Realizar la consulta a Firebase
      const snapshot = await getDocs(q);
      const data: EventProfile[] = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as EventProfile));
      setProfiles(data);
      saveToLocalStorage(`events_${userId}`, data);
    } catch (err) {
      setError("Error loading events"); // Manejo de errores
    } finally {
      setLoading(false); // Finalizar estado de carga
    }

    // Escuchar cambios en tiempo real
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const liveData: EventProfile[] = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as EventProfile));
      setProfiles(liveData);
      saveToLocalStorage(`events_${userId}`, liveData);
    });

    return () => unsubscribe();
  }, [userId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { profiles, slidesPerView, loading, error };
};

export default useHostEvents;
