import React, { useEffect, useState } from "react";
import { db } from "../../../utils/firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";
import "./AceptedInvitations.css";

interface AcceptedUser {
  id: string;
  name: string;
  profileUrl: string;
  eventName: string; 
}

interface InvitationsAcceptProps {
  creatorId: string; 
}

const InvitationsAccept: React.FC<InvitationsAcceptProps> = ({ creatorId }) => {
  const [acceptedUsers, setAcceptedUsers] = useState<AcceptedUser[]>([]);

  useEffect(() => {
    console.log("Creator ID in InvitationsAccept:", creatorId); 

    if (!creatorId) {
      console.error("Creator ID is missing."); 
      return; 
    }

    const fetchAcceptedUsers = async () => {
      try {
        const invitationsRef = collection(db, "invitations");
        
        const q = query(invitationsRef, where("creatorId", "==", creatorId), where("status", "==", "accepted"));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          console.log("No accepted invitations found for this creator."); // No se encontraron invitaciones
          return; 
        }

        const acceptedUsersData: AcceptedUser[] = [];
        querySnapshot.forEach((doc) => {
          const invitationData = doc.data();
          console.log("Invitation Data:", invitationData); 

         
          if (invitationData.userId && invitationData.username && invitationData.creatorImg) {
            acceptedUsersData.push({
              id: invitationData.userId,
              name: invitationData.username,
              profileUrl: invitationData.userImg,
              eventName: invitationData.eventName || "Unknown Event", 
            });
          } else {
            console.warn("Missing fields in invitation data:", invitationData); 
                    }
        });

        setAcceptedUsers(acceptedUsersData);
        console.log("Accepted Users:", acceptedUsersData); 
      } catch (error) {
        console.error("Error fetching accepted users:", error);
      }
    };

    fetchAcceptedUsers();
  }, [creatorId]);

  return (
    <div id="acepted_invitations_shadow">
      <div id="acepted_invitations_div">
        <h2 id="acepted_invitations_tittle">Invitations</h2>
        {acceptedUsers.length > 0 ? (
          acceptedUsers.map((user) => (
            <div key={user.id} id="acepted_invitation">
              <img id="profile_img" src={user.profileUrl} alt={user.name} />
              <div id="acepted_invitation_text">
                <p id="text_accepted_p">{user.name} accepted the invitation to <span>{user.eventName}</span></p> 
              </div>
            </div>
          ))
        ) : (
          <p id="no_accepted_inv">No accepted invitations yet.</p>
        )}
      </div>
    </div>
  );
};

export default InvitationsAccept;
