import React from "react";
import "./editButton.css"

interface EditButtonProps {
    icon: React.ReactNode;  
}

const EditButton: React.FC <EditButtonProps> = ({icon}) => {
    return (
       <div>
        <button id="edit_button">{icon}</button>
       </div>
    );
}

export default EditButton