import "./FunctionBtns.css"

interface FunctionProp{
    NextShooping: () => void;
    NextFound: () => void;
    NextInvite: () => void;
}

const FunctionBtn: React.FC<FunctionProp> = (prop) =>{
    return(
        <div className="FunctionBtn">
            <button onClick={prop.NextShooping}>
                <img src="https://firebasestorage.googleapis.com/v0/b/programacion-ec39e.appspot.com/o/DetailScreen%2FShopping.webp?alt=media&token=e4fcb8ff-dc4f-440d-9eb7-a5026689983e" alt="card shopping icon" />
                Shopping
            </button>
            <button onClick={prop.NextFound}>
                <img src="https://firebasestorage.googleapis.com/v0/b/programacion-ec39e.appspot.com/o/DetailScreen%2FFondo.webp?alt=media&token=111c0ea2-b645-40ca-8a8b-581d2bbc9fd0" alt="bill dollar icon" />
                Found
            </button>
            <button onClick={prop.NextInvite}>
                <img src="https://firebasestorage.googleapis.com/v0/b/programacion-ec39e.appspot.com/o/DetailScreen%2FAgregar.webp?alt=media&token=d6fdfcac-2a97-40a8-b94a-9c8dcaecd8fc" alt="invited icon" />
                Invite
            </button>
        </div>  
    
    )
}

export default FunctionBtn;