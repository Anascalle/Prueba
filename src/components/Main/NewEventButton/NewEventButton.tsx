import React from "react";
import "./NewEventButton.css"

interface OpenModalButtonProps {
    onClick: () => void;  
}

const NewEventButton: React.FC<OpenModalButtonProps>  = ({ onClick }) => {

    return (
       <div id="button_new_div">
        <h2 id="new_event_text">
            Create a new event!
        </h2>
        <button id="new_nevent_button"onClick={onClick}>
            +
        </button>
       </div>
    );
}

export default NewEventButton