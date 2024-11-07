import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./invitations.css";
import InvitationsCards from "./cards";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { collection, query, where, onSnapshot, doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "./../../../utils/firebaseConfig";

const Invitations: React.FC = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [invitations, setInvitations] = useState<any[]>([]);
  const { userId } = useParams<{ userId: string }>();
  const [visibleCount] = useState(4); 

  useEffect(() => {
    const fetchInvitations = () => {
      try {
        const q = query(
          collection(db, "invitations"),
          where("userId", "==", userId),
          where("status", "==", "pending")
        );

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          const invitationsData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setInvitations(invitationsData);
        });

        return unsubscribe;
      } catch (error) {
        console.error("Error fetching invitations: ", error);
      }
    };

    if (userId) {
      fetchInvitations();
    }
  }, [userId]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleAccept = async (invitationId: string, eventId: string) => {
    try {
      const eventRef = doc(db, "events", eventId);
      const eventDoc = await getDoc(eventRef);

      if (!eventDoc.exists()) {
        console.error("No se encontraron detalles del evento para el ID:", eventId);
        return;
      }

      const eventData = eventDoc.data();
      const eventType = eventData?.eventType;
      const eventDate = eventData?.date;

      const invitationRef = doc(db, "invitations", invitationId);
      await updateDoc(invitationRef, { status: "accepted" });

      console.log(`Invitación aceptada para el evento: ${eventType} en la fecha: ${eventDate}`);
      console.log(`ID del evento aceptado: ${eventId}`);

      setInvitations((prev) => prev.filter((inv) => inv.id !== invitationId));
    } catch (error) {
      console.error("Error accepting invitation: ", error);
    }
  };
  
  const handleReject = async (invitationId: string) => {
    try {
      const invitationRef = doc(db, "invitations", invitationId);
      await updateDoc(invitationRef, { status: "rejected" });
      
      console.log(`Invitación rechazada para el ID de invitación: ${invitationId}`);

      setInvitations((prev) => prev.filter((inv) => inv.id !== invitationId));
    } catch (error) {
      console.error("Error rejecting invitation: ", error);
    }
  };

  return (
    <div id="invitations_div_shadow">
      <div id="invitations_div">
        <h2 id="invitations_tittle">Invitations</h2>

        {invitations.length === 0 ? (
          <p id="no-invitations-message">No pending invitations</p>
        ) : isMobile ? (
          <Swiper
            spaceBetween={5}
            slidesPerView={1}
            pagination={{ clickable: true }}
            navigation={false}
          >
            {invitations.slice(0, visibleCount).map((invitation) => (
              <SwiperSlide key={invitation.id}>
                <InvitationsCards
                  creator={invitation.creatorName}
                  ocation={invitation.eventType}
                  eventDate={invitation.eventDate}
                  hour={invitation.startTime}
                  creatorImg={invitation.creatorImg}
                  eventData={invitation.eventData}
                  onAccept={() => handleAccept(invitation.id, invitation.eventId)}
                  onReject={() => handleReject(invitation.id)}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          invitations.slice(0, visibleCount).map((invitation) => (
            <InvitationsCards
              key={invitation.id}
              creator={invitation.creatorName}
              ocation={invitation.eventType}
              eventDate={invitation.eventDate}
              hour={invitation.startTime}
              creatorImg={invitation.creatorImg}
              eventData={invitation.eventData}
              onAccept={() => handleAccept(invitation.id, invitation.eventId)}
              onReject={() => handleReject(invitation.id)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Invitations;
