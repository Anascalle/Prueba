import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, doc, deleteDoc } from 'firebase/firestore'; 
import { getAuth } from 'firebase/auth';
import { Item } from '../hooks/useShoppingItem';

const firebaseConfig = {
    apiKey: "AIzaSyAPJBKfnpcxHtkPkS18CH4mb9AeFCq_9nY",
    authDomain: "programacion-ec39e.firebaseapp.com",
    projectId: "programacion-ec39e",
    storageBucket: "programacion-ec39e.appspot.com",
    messagingSenderId: "136757147578",
    appId: "1:136757147578:web:57d88a0060a8c982564f83"
  };


const app = initializeApp(firebaseConfig); 
const auth = getAuth(app);
const db = getFirestore(app);
const shop = getFirestore(app);

export const receiptsCollection = collection(db, "receipts");
export const eventsCollection = collection(db, "events");

export const getInvitations = async () => {
  const invitationsCol = collection(db, "invitations");
  const invitationSnapshot = await getDocs(invitationsCol);
  const invitationList = invitationSnapshot.docs.map((doc) => doc.data());
  return invitationList;
};
export const getItems = async () => {
  const itemsCollection = collection(shop, "shopping"); 
  const itemsSnapshot = await getDocs(itemsCollection);
  const itemsList = itemsSnapshot.docs.map(doc => ({
      id: Number(doc.id), // Convertimos el ID a número si es necesario
      image: doc.data().image || "", // Asignamos valores predeterminados
      name: doc.data().name || "Sin nombre",
      price: doc.data().price || 0,
      disponibility: doc.data().disponibility || 0,
      eventType: doc.data().eventType || "Desconocido",
  }));
  return itemsList as Item[]; // Asegura que el tipo sea Item[]
};

export const deleteInvitation = async (id: string) => {
  try {
    const invitationRef = doc(db, "invitations", id);
    await deleteDoc(invitationRef);
    console.log(`Invitation ${id} deleted from Firebase.`);
  } catch (error) {
    console.error("Error deleting invitation:", error);
  }
};


export { db, shop, auth };