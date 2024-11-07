import React, { useEffect, useState } from "react";
import "./Nav.css";
import useScroll from "../../../hooks/useScroll";
import { auth, db } from "../../../utils/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

const Nav3: React.FC = () => {
  const scrolled = useScroll();
  const [userName, setUserName] = useState<string | null>(null);
  const [profileImg, setProfileImg] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userDocRef = doc(db, "users", user.uid);  // Use user.uid instead of userId from URL
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUserName(userData.username || null);
            setProfileImg(userData.profileImg || null);  // Assuming 'profileImg' is the field name
          } else {
            console.error("No such document!");
            setUserName(null);
            setProfileImg(null);
          }
        } catch (error) {
          console.error("Error fetching user document:", error);
          setUserName(null);
          setProfileImg(null);
        }
      } else {
        setUserName(null);
        setProfileImg(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <nav className={`nav_bar3 ${scrolled ? 'scrolled' : ''}`}>
      <h1 className="app_name">Eventix</h1>
      <ul className="nav_links">
        <li><a href="/">ABOUT US</a></li>
        <li><a href="/about">SUPPORT</a></li>
      </ul>
      <img 
        id="profile_img_nav" 
        src={profileImg || "https://firebasestorage.googleapis.com/v0/b/programacion-ec39e.appspot.com/o/Personajes%2FPersonaje1.svg?alt=media&token=8c75c21d-de7c-430c-9246-fdadb91db2d7"} 
        alt="Profile" 
      />
      <p id="user_name_nav">{userName || "Guest"}</p>
    </nav>
  );
};

export default Nav3;
