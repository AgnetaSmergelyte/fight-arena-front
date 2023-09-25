import React, {useEffect, useState} from 'react';
import {io} from 'socket.io-client';
import SingleUserCard from "../components/SingleUserCard";

const Lobby = () => {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        const jwt = sessionStorage.getItem("token");
        if (jwt) {
            const socket = io("http://localhost:3001", {
                query: {
                    token: jwt
                }
            });
            socket.on('userList', val => {
                setUsers(val);
            });
        }
    }, [])

    return (
        <div className="container">
            <div></div>
            <div>
                {users.map(x => <SingleUserCard key={x.id} user={x} />)}
            </div>

        </div>
    );
};

export default Lobby;