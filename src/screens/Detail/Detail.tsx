import React from 'react';
import { useLocation } from 'react-router-dom'; 
import MapInformation from '../../components/DetailEvent/MapInformation';
import Nav3 from '../../components/DetailEvent/Nav/Nav.view';
import "./Detail.css"

const DetailScreen: React.FC = () => {
  const location = useLocation();
  const { id } = location.state || {}; 


  console.log('Received ID:', id);

  return (
    <div className="Detail-screen">
      <Nav3 />
      {id ? (
        <MapInformation eventId={id} /> 
      ) : (
        <p>No event selected</p>
      )}
    </div>
  );
};

export default DetailScreen;