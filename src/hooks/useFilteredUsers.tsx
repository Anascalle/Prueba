import { useEffect, useState } from 'react';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';

export const useFetchFilteredUsers = (searchValue: string) => {
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]);
  const db = getFirestore();  

  useEffect(() => {
    const fetchFilteredUsers = async () => {
      if (searchValue.trim() === "") {
        setFilteredUsers([]);  
        return;
      }

      try {
        const q = query(
          collection(db, "users"),
          where("username", ">=", searchValue),
          where("username", "<=", searchValue + "\uf8ff")
        );

        const querySnapshot = await getDocs(q);
        const usersList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setFilteredUsers(usersList);
      } catch (error) {
        console.error("Error fetching filtered users: ", error);
      }
    };

    fetchFilteredUsers();
  }, [searchValue, db]);

  return filteredUsers;
};