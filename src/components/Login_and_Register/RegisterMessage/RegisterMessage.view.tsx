import RegisterFormButton from "./RegisterMessageButton.view";
import "./registerMessageStyle.css"

interface MessageProps {
    title: string;
    infoMessagept1: string;
    infoMessagept2: string;

}

function RegisterMessage( { title, infoMessagept1, infoMessagept2,  }:MessageProps ){
    return <div id="MessageSpace">
        <h1>{title}</h1>
        <div>
        <p id="register_message">{infoMessagept1}</p>
            <div id="infoWithLink">
                <p id="register_message">{infoMessagept2}<RegisterFormButton/></p>
            </div>
        </div>
    </div>
}

export default RegisterMessage
