import React from "react";
import "./AceptedInvitations.css";
import porfiles from "../data/data";
import AceptedInvitations from "./AceptedInvitatios";

const InvitationsAccept: React.FC = (
) => {
  return (
    <div id="acepted_invitations_shadow">
      <div id="acepted_invitations_div">
        <h2 id="acepted_invitations_tittle">Invitations</h2>
        {porfiles.map((profile, index) => (
        <AceptedInvitations
          key={index}
          name={profile.name}
          ocation={profile.Ocation}
          url={profile.img}
        />
      ))}
      </div>
    </div>
  );
};

export default InvitationsAccept;