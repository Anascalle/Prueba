import React from 'react'; 
import { useParams } from 'react-router-dom'; 
import Nav2 from '../../components/Main/Nav/Nav.view';
import InvitationsAccept from '../../components/Main/AceptedInvitations/AceptedInvitations';
import Invitations from '../../components/Main/Invitations/invitations';
import Host from '../../components/Main/Host/card2';
import Guest from '../../components/Main/Guest/card';
import CreateEventForm from '../../components/Main/CreateEventForm/CreateEventForm';
import "./Main.css";

const Main: React.FC = () => {
  const { userId } = useParams<{ userId: string; eventId: string }>();
    return (
        <div id='main_screen'>
            <Nav2 />
            <Invitations />
            <Host userId={userId!} />
            <Guest userId={userId!} />
            <CreateEventForm />
            <InvitationsAccept creatorId={userId!} /> 
            <div id="root"></div>
            <div id="modal-root"></div>
        </div>
    );
};

export default Main;
