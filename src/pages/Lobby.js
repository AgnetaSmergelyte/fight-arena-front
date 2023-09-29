import React, {useEffect} from 'react';
import SingleUserCard from "../components/SingleUserCard";
import {useSelector} from "react-redux";
import Inventory from "../components/Inventory";
import {socket} from "../App";
import {useNavigate} from "react-router-dom";
import RequestModal from "../components/RequestModal";

const Lobby = ({users, setAlert, request, setRequest}) => {
    const nav = useNavigate();
    const username = useSelector(state => state.username);

    useEffect(() => {
        if (!sessionStorage.getItem("token")) {
            nav("/");
            return;
        }
        socket.emit("getUsersOnline");
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
        </div>
    );
};

export default Lobby;