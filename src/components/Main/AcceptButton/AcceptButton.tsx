import React from "react";
import "./AcceptButton.css";

interface AcceptButtonProps {
  icon: React.ReactNode;
  onClick: () => void; 
}

const AcceptButton: React.FC<AcceptButtonProps> = ({ icon, onClick }) => {
  return (
    <div>
      <button id="edit_button" onClick={onClick}>
        {icon}
      </button>
    </div>
  );
};

export default AcceptButton;
