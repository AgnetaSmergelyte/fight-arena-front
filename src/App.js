import './App.css';
import Toolbar from "./components/Toolbar";
import {Route, Routes, useNavigate} from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {changeUsername, changeId} from "./features/user";
import Lobby from "./pages/Lobby";

function App() {

    const nav = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        let token = sessionStorage.getItem("token");
        if (!token) {
            const autologin = localStorage.getItem("autologin");
            if (autologin) {
                sessionStorage.setItem("token", autologin);
                token = autologin;
            } else {
                nav("/login")
                return;
            }
        }
        const options = {
            method: 'GET',
            headers: {
                "content-type": "application/json",
                "authorization": token
            }
        }
        fetch("http://localhost:8080/getUser", options)
            .then(res => res.json())
            .then(data => {
                if (!data.error) {
                    dispatch(changeId(data.data.id));
                    dispatch(changeUsername(data.data.username));
                }
            })
            .catch(error => {})

    }, []);

    return (
        <div className="App">
            <Toolbar/>
            <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<SignUp/>}/>
                <Route path="/" element={<Lobby/>}/>
            </Routes>
        </div>
    );
}

export default App;
