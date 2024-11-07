import React from "react";
import "./RejectButton.css";

interface RejectButtonProps{
  onClick: () => void;
}

const RejectButton: React.FC<RejectButtonProps> = ({ onClick }) => {
  return (
    <div>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
      />
      <button id="deleted" onClick={onClick}>
        <span className="material-symbols-outlined">delete</span>
      </button>
    </div>
  );
};

export default RejectButton;
