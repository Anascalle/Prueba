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
                <img src="https://firebasestorage.googleapis.com/v0/b/programacion-ec39e.appspot.com/o/cart%20remove.webp?alt=media&token=28e87dcc-db6b-4ae1-9930-dde0bd1f4138" alt="card shopping icon" />
                Shopping
            </button>
            <button onClick={prop.NextFound}>
                <img src="https://firebasestorage.googleapis.com/v0/b/programacion-ec39e.appspot.com/o/bill%20dollar.webp?alt=media&token=bd78246c-f823-480d-970c-dafcd1cb4198" alt="bill dollar icon" />
                Found
            </button>
            <button onClick={prop.NextInvite}>
                <img src="https://firebasestorage.googleapis.com/v0/b/programacion-ec39e.appspot.com/o/Group%201000004492.webp?alt=media&token=44607f6a-e0da-4848-9470-32938dd70d3b" alt="invited icon" />
                Invite
            </button>
        </div>  
    
    )
}

export default FunctionBtn;