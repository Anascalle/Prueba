import "./BackBTn.css"
import { useNavigate } from "react-router-dom";

interface BackProp {
    NameEvent: string;
}

const BackBtn: React.FC<BackProp> = (prop) => {
    const navigate = useNavigate(); 

    const handleBackClick = () => {
        navigate(-1); 
    };

    return (
        <div className="BackBtn">
            <button onClick={handleBackClick}>
                <img src="https://firebasestorage.googleapis.com/v0/b/programacion-ec39e.appspot.com/o/DetailScreen%2FBack.webp?alt=media&token=f18bcebc-06b9-4d2f-abe5-895fe0f7505b" alt="backbutton" />
            </button>
            <p>{prop.NameEvent}</p>
        </div>
    );
}

export default BackBtn;