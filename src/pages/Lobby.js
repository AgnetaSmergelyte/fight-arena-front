import React, {useEffect, useState} from 'react';
import SingleUserCard from "../components/SingleUserCard";
import {useDispatch, useSelector} from "react-redux";
import Inventory from "../components/Inventory";
import {socket} from "../App";
import {useNavigate} from "react-router-dom";
import RequestModal from "../components/RequestModal";
import AlertBox from "../components/AlertBox";
import {setPlayer1, setPlayer2, setRoom, setTurn} from "../features/user";

const Lobby = () => {

    const nav = useNavigate();
    const dispatch = useDispatch();
    const [users, setUsers] = useState([]);
    const username = useSelector(state => state.username);
    const [request, setRequest] = useState(null);
    const [alert, setAlert] = useState(null);

    useEffect(() => {
        if (!sessionStorage.getItem("token")) {
            nav("/");
            return;
        }
        socket.on('userList', val => {
            setUsers(val);
        });
        socket.emit("getUsersOnline");

        socket.on('request', val => {
            setRequest(val);
        });
        socket.on('answer', val => {
            if (val.answer === 'no') {
                setAlert(`${val.sender} denied your request`)
            }
        });
        socket.on('gotTheRoom', val => {
            dispatch(setRoom(val.roomName));
            dispatch(setPlayer1(val.player1));
            dispatch(setPlayer2(val.player2));
            dispatch(setTurn(val.turn));
            socket.emit('join', val.roomName);
            nav('/arena');
        })
    }, [])

    return (
        <div className="container">
            <div className="d-flex g10 f-wrap j-center w-100">
                <Inventory />
                <div className="section d-flex f-col p10 g10">
                    {users.map((x, i) => x.username !== username && <SingleUserCard key={i} user={x} setAlert={setAlert}/>)}
                </div>
            </div>
            {(request) && <RequestModal request={request} setRequest={setRequest} setAlert={setAlert} />}
            {(alert) && <AlertBox alert={alert} setAlert={setAlert} />}
        </div>
    );
};

export default Lobby;