import React from "react";
import "./deletedButton.css"


const DeletedButton: React.FC = () => {
    return (
        
       <div>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
        <button id="deleted"><span className="material-symbols-outlined">delete</span></button>
       </div>
    );
}

export default DeletedButton