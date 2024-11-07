import { useState } from "react";
import { deleteDoc, doc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from "../utils/firebaseConfig";

const useDeleteEvent = () => {
const [error, setError] = useState<string | null>(null);
const [deleting, setDeleting] = useState(false);
const auth = getAuth();

const deleteEvent = async (eventId: string) => {
    setDeleting(true);
    setError(null);

    try {
    await deleteDoc(doc(db, "events", eventId));
    console.log(`Event with ID ${eventId} deleted from Firebase.`);

    onAuthStateChanged(auth, (user) => {
        if (!user) {
        console.warn("User was signed out unexpectedly after deletion.");
        }
    });
    } catch (err) {
    setError("Error deleting event");
    console.error("Error deleting event:", err);
    } finally {
    setDeleting(false);
    }
};

return { deleteEvent, deleting, error };
};

export default useDeleteEvent;