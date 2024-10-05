import React from 'react';
import "./Input.css"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    lillogo: string;
    info: string;
    infoPlaceholder: string;
    uid: string;
    inputType: string;
}

const Inputs: React.FC<InputProps> = ({ uid, lillogo, info, infoPlaceholder, inputType, ...props }) => {

    return <div id='inputSpace'>
        <p className='inputs_p'>{info}</p>
        <div id='img-Input'>
            <img src={lillogo} alt="" />
            <input className='theRegisterInput' id={uid} type={inputType} placeholder={infoPlaceholder} {...props}/>
        </div>
        <hr id='lineaHorizontal' />
    </div>
}


export default Inputs