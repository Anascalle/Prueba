import React, { useState } from "react";
import Inputs from "../Input/Input.view";
import RegisterButton from "../RegisterButton/RegisterButton.view";
import LoginMessage from "../LoginMessage/LoginMessage.view";
import useFirebaseLogin from "../../../hooks/useLogin";
import "./LoginForm.css";

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, error } = useFirebaseLogin(); 

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        login(email, password);
    };

    return (
        <div id='LogSpace'>
            <img id="LogImg" src="https://firebasestorage.googleapis.com/v0/b/programacion-ec39e.appspot.com/o/LoginSigup%2FFista%20login.webp?alt=media&token=9fcd2b8c-053f-4a35-bb6a-ed558e6ba107" alt="" />
            <div className="registerSpace">
                <form onSubmit={handleLogin} id="loginForm">
                    <LoginMessage
                        title="Log In"
                        infoMessagept1="If you haven't registered yet"
                        infoMessagept2="You can"
                    />
                    <Inputs
                        inputType="email"
                        uid="loginEmail"
                        lillogo="/mail.svg"
                        info="Email"
                        infoPlaceholder="Enter your email address"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Inputs
                        inputType="password"
                        uid="loginPassword"
                        lillogo="/lock.svg"
                        info="Password"
                        infoPlaceholder="Enter your password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {error && <div className="errorMessage">{error}</div>}
                    <RegisterButton btnId="" buttonText="Login" />
                </form>
            </div>
        </div>
    );
}

export default LoginForm;
