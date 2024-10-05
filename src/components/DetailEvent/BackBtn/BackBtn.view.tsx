import "./BackBtn.css";
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
                <img src="https://firebasestorage.googleapis.com/v0/b/programacion-ec39e.appspot.com/o/Back.webp?alt=media&token=e360dcdd-63d6-41f7-af72-77f6785e2105" alt="backbutton" />
            </button>
            <p>{prop.NameEvent}</p>
        </div>
    );
}

export default BackBtn;