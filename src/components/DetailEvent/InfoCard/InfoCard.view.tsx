import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ModalInvite from "../InviteDetailModal/InviteDetailModal";
import "./InfoCard.css";
import FunctionBtn from "../FunctionBtns/FunctionBtns.view";
import useInviteLogic from "../../../hooks/useInviteLogic";

interface InfoProp {
  img: string;
  NameEvent: string;
  Host: string;
  EventType: string;
  DressCode: string;
  Date: string;
  StartTime: string;
  Location: string;
  Description: string;
}

const InfoCard: React.FC<InfoProp> = (prop) => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const eventId = state?.id;

  const {
    isModalOpen,
    setIsModalOpen,
    searchValue,
    setSearchValue,
    filteredUsers,
    selectedUsers,
    setSelectedUsers,
    handleInviteUser,
    handleNextInvite,
  } = useInviteLogic(eventId);

  const handleNextShooping = () => {
    navigate(`/shopping/${eventId}`, { state: { eventType: prop.EventType, eventId } });
  };
  
  const handleNextFound = () => {
    console.log("Found clicked");
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSearchValue(''); 
    setSelectedUsers([]); 
  };
  return (
    <div className="InfoCard">
      <div className="ImgBanner">
        <img src={prop.img} alt="" />
      </div>
      <div className="NameEvent">
        <h1>{prop.NameEvent}</h1>
      </div>
      <div className="Host">
        <p>{prop.Host}</p>
      </div>
      <div className="InfoSections">
        <div className="InfoSecttion1">
          <p><strong>Event Type:</strong> {prop.EventType}</p>
          <p><strong>Dress Code:</strong> {prop.DressCode}</p>
          <p><strong>Date:</strong> {prop.Date}</p>
          <p><strong>Start Time:</strong> {prop.StartTime}</p>
          <p><strong>Location:</strong> {prop.Location}</p>
        </div>
        <div className="InfoSecttion2">
          <p><strong>Description:</strong> </p>
          <p>{prop.Description}</p>
        </div>
      </div>

      <div className="FunctionBtns">
        <FunctionBtn
          NextShooping={handleNextShooping}
          NextFound={handleNextFound}
          NextInvite={handleNextInvite}
        />
      </div>

      {isModalOpen && (
        <ModalInvite
          users={filteredUsers}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          closeModal={closeModal} 
          selectedUsers={selectedUsers}
          setSelectedUsers={setSelectedUsers}
          handleInviteUser={handleInviteUser}
        />
      )}
    </div>
  );
};

export default InfoCard;
