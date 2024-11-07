import React from "react";
import "./deletedButton.css";

interface DeletedButtonProps {
  onClick: () => void;
}

const DeletedButton: React.FC<DeletedButtonProps> = ({ onClick }) => {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation(); 
    onClick();
  };

  return (
    <div>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
      <button id="deleted" onClick={handleClick}>
        <span className="material-symbols-outlined">delete</span>
      </button>
    </div>
  );
};

export default DeletedButton;