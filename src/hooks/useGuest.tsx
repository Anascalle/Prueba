import { useEffect, useState, useCallback } from "react";
import { db } from "../utils/firebaseConfig";
import { collection, onSnapshot, query, where } from "firebase/firestore"; 
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
    const fetchInvitations = async () => {
      try {
        const invitationsQuery = query(
          collection(db, "invitations"),
          where("userId", "==", userId),
          where("status", "==", "accepted") // Filtramos las invitaciones aceptadas
        );

        const unsubscribeInvitations = onSnapshot(invitationsQuery, (querySnapshot) => {
          const eventIds = [...new Set(querySnapshot.docs.map(doc => doc.data().eventId))]; // Elimina duplicados
          console.log("Event IDs from accepted invitations: ", eventIds); // Log para verificar IDs

          if (eventIds.length > 0) {
            const eventsQuery = query(
              collection(db, "events"),
              where("__name__", "in", eventIds) // Usamos __name__ para obtener documentos por su ID
            );

            const unsubscribeEvents = onSnapshot(eventsQuery, (eventsSnapshot) => {
              const data: EventProfile[] = eventsSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
              } as EventProfile));
              console.log("Fetched Events: ", data); // Log para verificar eventos
              setProfiles(data);
              setLoading(false);
            });

            return () => unsubscribeEvents(); // Desuscribir eventos
          } else {
            setProfiles([]); // No hay invitaciones aceptadas, no hay eventos que mostrar
            setLoading(false);
          }
        });

        return () => unsubscribeInvitations(); // Desuscribir invitaciones
      } catch (error) {
        console.error("Error fetching events: ", error);
        setError("Error loading events. Please try again later.");
        setLoading(false);
      }
    };

    fetchInvitations();
  }, [userId]);

  return { profiles, slidesPerView, loading, error };
};

export default useGuestEvents;
