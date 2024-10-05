import React from "react";
import "./AceptedInvitations.css"

interface InvitationsProps {
    name: string;
    ocation: string;
    url: string;
  }
  
const AceptedInvitations: React.FC<InvitationsProps> = ({
  name,
  ocation,
  url
}) =>{
  return (
    <div id="acepted_invitation">
    <img id="porfile_img" src={url} alt={name} />
    <div id="invitation_text">
      <p id="acepted_invitations-p">{name} accept your invitation for <span id="ocation">{ocation}</span></p>
    </div>
  </div>
  );
};

export default AceptedInvitations;
