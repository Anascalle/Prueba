import React from "react";
import AcceptButton from "../AcceptButton/AcceptButton";
import RejectButton from "../RejectButton/RejectButton";
import "./invitations.css";

interface InvitationsProps {
  ocation: string;
  creatorImg: string;
  creator: string;
  eventDate: string;
  eventData: any;
  hour: string;
  onAccept: () => void;
  onReject: () => void;
}

const InvitationsCards: React.FC<InvitationsProps> = ({
  creator,
  ocation,
  eventDate,
  hour,
  creatorImg,
  onAccept,
  onReject,
}) => {
  return (
    <div id="Invitation">
      <img id="profile_img" src={creatorImg} alt={`Creator: ${creator}`} />
      <div id="invitation_text">
        <p id="name">{creator} sent you an invitation</p>
        <p id="ocation">
          Ocation: <span id="ocation_type">{ocation}</span>
        </p>
        <p id="date">
          Date: <span id="date_number">{eventDate}</span>
        </p>
        <p id="date">
          Hour: <span id="date_number">{hour}</span>
        </p>
      </div>
      <div id="Buttons">
        <RejectButton onClick={onReject} />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
        />
        <AcceptButton
          icon={<span className="material-symbols-outlined">check</span>}
          onClick={onAccept}
        />
      </div>
    </div>
  );
};

export default InvitationsCards;
