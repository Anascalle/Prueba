import React from "react";
import DeletedButton from "../DeletedButton/deletedButton";
import EditButton from "../EditButton/editButton";
import "./Host.css"
import { useNavigate } from "react-router-dom";

interface HostEventsProps {
    
    date: string;
    url: string;
    id: string;
    name:string
  }
  
const HostEvents: React.FC<HostEventsProps> = ({
 
  date,
  url,
  id,
  name
}) =>{
    const navigate = useNavigate();

  const handleButtonClick = () => {
    console.log(`Button clicked. Card ID: ${id}`);
    navigate(`/detail/${id}`, { state: { id } }); 

  };
  
  return (
    <button id="hosts_events" onClick={handleButtonClick}>
        <img id="event_img" src={url} alt="" />
        <p id="ocation_event">{name}</p>
        <p id="date_event">{date}</p>
        <div id="buttons_event">
            <DeletedButton></DeletedButton>
            <EditButton icon="Edit"></EditButton>
        </div>

  </button>
  );
};

export default HostEvents;