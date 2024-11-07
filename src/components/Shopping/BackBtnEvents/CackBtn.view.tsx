import "./BackBTnEvents.css"
import { useNavigate } from "react-router-dom";


const BackBtnEvents: React.FC = () => {
    const navigate = useNavigate(); 

    const handleBackClick = () => {
        navigate(-1); 
    };

    return (
        <div className="BackBtnEvents">
            <button className="" onClick={handleBackClick}>
                <img src="https://firebasestorage.googleapis.com/v0/b/programacion-ec39e.appspot.com/o/DetailScreen%2FBack.webp?alt=media&token=f18bcebc-06b9-4d2f-abe5-895fe0f7505b" alt="backbuttonEvents" />
            </button>
            <p>Your events</p>
        </div>
    );
}

export default BackBtnEvents;