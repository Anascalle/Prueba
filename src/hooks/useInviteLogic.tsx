import { useState } from "react";
import { getFirestore, collection, doc, setDoc, getDoc } from "firebase/firestore";
import { useFetchFilteredUsers } from "./useFilteredUsers";

export interface User {
  id: string;
  username: string;
  img: string; // Imagen del usuario
}

export interface UseInviteLogicReturn {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  filteredUsers: User[];
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  selectedUsers: User[];
  setSelectedUsers: React.Dispatch<React.SetStateAction<User[]>>;
  handleInviteUser: () => Promise<void>;
  handleNextInvite: () => void;
  sentInvitations: {
    userId: string;
    eventId: string;
    eventType?: string;
    eventDate?: string;
    startTime?: string;
    creatorName?: string;
    creatorId?: string;
    creatorImg?: string;
    username?: string;
    userImg?: string; // Imagen del usuario invitado
    eventName?: string; // Nombre del evento
  }[];
  visibleInvitations: {
    userId: string;
    eventId: string;
    eventType?: string;
    eventDate?: string;
    startTime?: string;
    creatorName?: string;
    creatorId?: string;
    creatorImg?: string;
    username?: string;
    userImg?: string; 
    eventName?: string; 
  }[];
  loadMoreInvitations: () => void;
}

const useInviteLogic = (eventId: string | undefined): UseInviteLogicReturn => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [sentInvitations, setSentInvitations] = useState<
    {
      userId: string;
      eventId: string;
      eventType?: string;
      eventDate?: string;
      startTime?: string;
      creatorName?: string;
      creatorId?: string;
      creatorImg?: string;
      username?: string;
      userImg?: string; // Imagen del usuario invitado
      eventName?: string; // Nombre del evento
    }[]
  >([]);
  const [visibleInvitationsCount, setVisibleInvitationsCount] = useState(4);

  const db = getFirestore();
  const filteredUsers = useFetchFilteredUsers(searchValue);

  const fetchEventDetails = async (eventId: string) => {
    const eventRef = doc(db, "events", eventId);
    const eventDoc = await getDoc(eventRef);
    if (eventDoc.exists()) {
      const eventData = eventDoc.data();
      return {
        eventType: eventData?.eventType || "",
        eventDate: eventData?.date || "",
        startTime: eventData?.startTime || "",
        creatorId: eventData?.userId || "",
        eventName: eventData?.name || "", // Obtener el nombre del evento
      };
    }
    return { eventType: "", eventDate: "", startTime: "", creatorId: "", eventName: "" };
  };

  const fetchCreatorDetails = async (creatorId: string) => {
    if (!creatorId) return { creatorName: "", creatorImg: "" };
    const userRef = doc(db, "users", creatorId);
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
      const userData = userDoc.data();
      return {
        creatorName: userData?.username || "",
        creatorImg: userData?.img || "",
      };
    }
    return { creatorName: "", creatorImg: "" };
  };

  const fetchUserDetails = async (userId: string) => {
    const userRef = doc(db, "users", userId);
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
      const userData = userDoc.data();
      return {
        username: userData?.username || "",
        img: userData?.img || "", // Obtener la imagen del usuario
      };
    }
    return { username: "", img: "" }; // Manejar el caso donde no existe el usuario
  };

  const handleInviteUser = async () => {
    if (!eventId || selectedUsers.length === 0) {
      console.error("No users selected or event ID is missing");
      return;
    }

    try {
      const eventDetails = await fetchEventDetails(eventId);
      const creatorId = eventDetails.creatorId; // Obtener el userId del creador
      const { creatorName, creatorImg } = await fetchCreatorDetails(creatorId); // Usar creatorId para obtener los detalles

      const newInvitations: any[] = [];

      for (const user of selectedUsers) {
        const userDetails = await fetchUserDetails(user.id);
        const userImg = user.img; // Guardar la imagen del usuario aquí

        const invitation = {
          userId: user.id, // ID del usuario que recibe la invitación
          eventId: eventId,
          eventType: eventDetails.eventType,
          eventDate: eventDetails.eventDate,
          startTime: eventDetails.startTime,
          userImg, // Guardar la imagen del usuario aquí
          creatorName,
          creatorId, // Incluir el ID del creador aquí
          creatorImg,
          username: userDetails.username,
          eventName: eventDetails.eventName, // Guardar el nombre del evento
        };
        newInvitations.push(invitation);

        const invitationsRef = collection(db, "invitations");
        const invitationDoc = doc(invitationsRef);
        await setDoc(invitationDoc, {
          ...invitation,
          status: "pending",
          dateSent: new Date().toISOString(),
        });
        console.log(`Invitación enviada a: ${userDetails.username} para el evento: ${eventId} por el creador: ${creatorName}`);
      }

      setSentInvitations((prev) => [...prev, ...newInvitations]);
      setIsModalOpen(false);
      setSelectedUsers([]);
    } catch (error) {
      console.error("Error inviting users: ", error);
    }
  };

  const handleNextInvite = () => {
    setIsModalOpen(true);
  };

  const loadMoreInvitations = () => {
    setVisibleInvitationsCount((prevCount) => prevCount + 4);
  };

  const visibleInvitations = sentInvitations.slice(0, visibleInvitationsCount);

  return {
    isModalOpen,
    setIsModalOpen,
    filteredUsers,
    searchValue,
    setSearchValue,
    selectedUsers,
    setSelectedUsers,
    handleInviteUser,
    handleNextInvite,
    sentInvitations,
    visibleInvitations,
    loadMoreInvitations,
  };
};

export default useInviteLogic;
