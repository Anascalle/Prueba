import React from 'react';
import CreateEventFormView from './CreateEventForm.View';
import NewEventButton from '../NewEventButton/NewEventButton';
import useCreateEventForm from '../../../hooks/useCreateEvent';

const CreateEventForm: React.FC = () => {
    const {
        name,
        setName,
        date,
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
        handleSubmit,
        lat,
        lng,
        onMapClick,
        handleClose,
        handleOpenModal,
        isModalOpen,
        eventImage,
        amount,
        setAmount,
    } = useCreateEventForm();

    return (
        <>
            <NewEventButton onClick={handleOpenModal} />
            {isModalOpen && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    zIndex: 1000,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <CreateEventFormView
                        name={name}
                        setName={setName}
                        date={date}
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
                        handleSubmit={handleSubmit}
                        lat={lat}
                        lng={lng}
                        onMapClick={onMapClick}
                        onClose={handleClose}
                        eventImage={eventImage}
                        amount={amount || 0}
                        setAmount={setAmount}
                    />
                </div>
            )}
        </>
    );
};

export default CreateEventForm;
