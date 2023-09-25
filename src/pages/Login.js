import React, {useRef, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {changeUsername, changeId, changeMoney} from "../features/user";

const Login = () => {

    const nav = useNavigate();
    const dispatch = useDispatch();
    const usernameRef = useRef();
    const passwordRef = useRef();
    const autologinRef = useRef();
    const [errorMsg, setErrorMsg] = useState('');

    async function loginUser() {
        setErrorMsg('');
        const autologin = autologinRef.current.checked;
        const userData = {
            username: usernameRef.current.value,
            password: passwordRef.current.value
        }
        const options = {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(userData)
        }
        try {
            const res = await fetch("http://localhost:8080/login", options);
            const data = await res.json();
            if (data.error) {
                setErrorMsg(data.message);
            } else {
                dispatch(changeId(data.data.user.id));
                dispatch(changeUsername(data.data.user.username));
                dispatch(changeMoney(data.data.user.money));
                if (autologin) localStorage.setItem("autologin", data.data.token);
                sessionStorage.setItem("token", data.data.token);
                nav("/");
            }
        } catch (err) {
            setErrorMsg('Server Error');
        }
    }

    return (
            <div className="container">
                <div className="form">
                    <input type="text" ref={usernameRef} placeholder="Username"/>
                    <input type="password" ref={passwordRef} placeholder="Password"/>
                    <b className="text-center text-red">{errorMsg}</b>
                    <div className="d-flex g10 j-center">
                        <input type="checkbox" ref={autologinRef} />
                        <span>Keep me logged in</span>
                    </div>
                    <button onClick={loginUser}>Log In</button>
                </div>
            </div>
    );
};

export default Login;