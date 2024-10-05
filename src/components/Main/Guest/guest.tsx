import React from "react";
import "./guest.css"
import { useNavigate } from "react-router-dom";

interface GuestEventesProps {
    ocation: string;
    date: string;
    url: string;
    name: string
    id: string;
  
  }
  
const GuestEventes: React.FC<GuestEventesProps> = ({

  date,
  url,
  name,
  id,
}) =>{
    const navigate = useNavigate();

  const handleButtonClick = () => {
    console.log(`Button clicked. Card ID: ${id}`);
    navigate(`/detail/${id}`, { state: { id } }); 
  };
  
  return (
    <button id="Guest_events" onClick={handleButtonClick}>
        <img id="event_img" src={url} alt="event img" />
        <p id="ocation_event">{name}</p>
        <p id="date_event">{date}</p>
        
  </button>
  );
};

export default GuestEventes;