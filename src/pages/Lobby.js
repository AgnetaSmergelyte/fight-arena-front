import React, {useEffect, useState} from 'react';
import SingleUserCard from "../components/SingleUserCard";
import {useSelector} from "react-redux";
import Inventory from "../components/Inventory";
import {socket} from "../App";
import {useNavigate} from "react-router-dom";

const Lobby = () => {

    const nav = useNavigate();
    const [users, setUsers] = useState([]);
    const username = useSelector(state => state.username);

    useEffect(() => {
        if (!sessionStorage.getItem("token")) nav("/");
        socket.on('userList', val => {
            setUsers(val);
        });
        socket.emit("getUsersOnline");
        socket.on('items', val => {
            console.log(val)
        });
    }, [])

    return (
        <div className="container">
            <div className="d-flex g10 f-wrap j-center">
                <Inventory />
                <div className="section d-flex f-col p10 g10">
                    {users.map((x, i) => x.username !== username && <SingleUserCard key={i} user={x}/>)}
                </div>
            </div>
        </div>
    );
};

export default Lobby;