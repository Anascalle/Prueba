import React from "react";
import ReactDOM from "react-dom";
import "./editButton.css"
import EeditEventView from "../EditEvent/EditEvent";
import useEditEventForm from "../../../hooks/useEditEventForm";

interface EditButtonProps {
    icon: React.ReactNode; 
    eventId: string;  
}

const EditButton: React.FC<EditButtonProps> = ({ icon, eventId }) => {
    const {
        
        name: eventName,
        setName,
        date: eventDate,
        setDate,
        startTime,
        setStartTime,
        location,
        setLocation,
        eventType,
        setEventType,
        dressCode,
        setDressCode,
        description,
        setDescription,
        lat,
        lng,
        onMapClick,
        handleClose,
        handleOpenModal,
        isModalOpen,
        amount,
        setAmount,
    } = useEditEventForm(eventId);

    return (
        <div>
        <button id="edit_button" onClick={handleOpenModal}>{icon}</button>
        {isModalOpen && ReactDOM.createPortal(
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 10000,
            }}>
                <EeditEventView
                    eventId={eventId} // Asegúrate de pasar el eventId correcto aquí
                    name={eventName}
                    setName={setName}
                    date={eventDate}
                    setDate={setDate}
                    startTime={startTime}
                    setStartTime={setStartTime}
                    location={location}
                    setLocation={setLocation}
                    eventType={eventType}
                    setEventType={setEventType}
                    dressCode={dressCode}
                    setDressCode={setDressCode}
                    description={description}
                    setDescription={setDescription}
                    lat={lat}
                    lng={lng}
                    onMapClick={onMapClick}
                    onClose={handleClose}
                    amount={amount || 0}
                    setAmount={setAmount}
                />
            </div>,
            document.getElementById("modal-root")!
        )}
    </div>
    );
};

export default EditButton;
