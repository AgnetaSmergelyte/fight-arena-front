import './App.css';
import Toolbar from "./components/Toolbar";
import {Route, Routes, useNavigate} from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {
    changeUsername,
    changeId,
    setInventory,
    setImage,
    setMoney,
    setRoom,
    setPlayer1, setPlayer2, setTurn, setNewItems, changeMoney
} from "./features/user";
import Lobby from "./pages/Lobby";
import {io} from 'socket.io-client';
import Arena from "./pages/Arena";
import AlertBox from "./components/AlertBox";

export const socket = io("http://localhost:3001", {
    autoConnect: true
});

function App() {
    const nav = useNavigate();
    const dispatch = useDispatch();
    const [users, setUsers] = useState([]);
    const [alert, setAlert] = useState(null);
    const [request, setRequest] = useState(null);
    const [prize, setPrize] = useState(0);
    const [winner, setWinner] = useState(null);
    const username = useSelector(state => state.username);

    useEffect(() => {
        socket.on('userList', val => {
            setUsers(val);
        });
        socket.on('inventory', val => {
            dispatch(setInventory(val));
        });
        socket.on('items', val => {
            dispatch(setNewItems(val.items));
            dispatch(setMoney(val.money));
        });
        socket.on('request', val => {
            setRequest(val);
        });
        socket.on('answer', answer => {
            setAlert(answer);
        });
        socket.on('gotTheRoom', val => {
            dispatch(setRoom(val.roomName));
            dispatch(setPlayer1(val.player1));
            dispatch(setPlayer2(val.player2));
            dispatch(setTurn(val.turn));
            socket.emit('join', val.roomName);
            setPrize(0);
            setWinner(null);
            nav('/arena');
        });

        let token = sessionStorage.getItem("token");
        if (!token) {
            const autologin = localStorage.getItem("autologin");
            if (autologin) {
                sessionStorage.setItem("token", autologin);
                token = autologin;
            } else {
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
                    dispatch(setMoney(data.data.money));
                    dispatch(setInventory(data.data.inventory));
                    dispatch(setImage(data.data.image));
                    socket.emit("logged",{username: data.data.username, image: data.data.image});
                    nav("/lobby")
                }
            })
            .catch(error => {})
    }, []);

    useEffect(() => {
        if (!username) return;
        socket.on("attackResults", val => {
            dispatch(setPlayer1(val.player1));
            dispatch(setPlayer2(val.player2));
            dispatch(setTurn(val.turn));
            if (val.gameOver) {
                if (val.player1.hp === 0) {
                    setWinner({username: val.player2.username, gold: val.player2.gold});
                    if (username === val.player2.username) dispatch(changeMoney(val.player2.gold));
                } else {
                    setWinner({username: val.player1.username, gold: val.player1.gold});
                    if (username === val.player1.username) dispatch(changeMoney(val.player1.gold));
                }
            }
            if (username === val.player1.username) {
                setPrize(val.player1.gold)
            } else {
                setPrize(val.player2.gold)
            }
        })
    }, [username])

    return (
        <div className="App">
            <Toolbar/>
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/register" element={<SignUp/>}/>
                <Route path="/lobby" element={<Lobby users={users} setAlert={setAlert} request={request} setRequest={setRequest}/>}/>
                <Route path="/arena" element={<Arena prize={prize} winner={winner} />}/>
            </Routes>
            {(alert) && <AlertBox alert={alert} setAlert={setAlert} />}
        </div>
    );
}

export default App;
