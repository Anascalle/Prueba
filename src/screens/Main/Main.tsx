import React from 'react'; 
import { useParams } from 'react-router-dom'; 
import Nav2 from '../../components/Main/Nav/Nav.view';
import InvitationsAccept from '../../components/Main/AceptedInvitations/Card';
import Invitations from '../../components/Main/Invitations/invitations';
import Host from '../../components/Main/Host/card2';
import Guest from '../../components/Main/Guest/card';
import CreateEventForm from '../../components/Main/CreateEventForm/CreateEventForm';
import "./Main.css";

const Main: React.FC = () => {
    const { userId } = useParams(); 

    return (
     <div id='main_screen'>
       <Nav2></Nav2>
       <Invitations></Invitations>
       <Host userId={userId!}  ></Host>
       <Guest userId={userId!} />
       <CreateEventForm></CreateEventForm>
       <InvitationsAccept></InvitationsAccept>
    </div>
    );
};

export default Main;