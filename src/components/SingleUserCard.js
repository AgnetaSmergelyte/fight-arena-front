import React from 'react';
import {socket} from "../App";
import {useSelector} from "react-redux";

const SingleUserCard = ({user, setAlert}) => {
    const selectedItems = useSelector(state => state.selectedItems);
    function sendRequest() {
        if (selectedItems[0] === null) {
            setAlert('Select your weapon first')
            return;
        }
        socket.emit("requestToPlay", {requestTo: user.socketId, inventory: selectedItems});
    }

    return (
        <div className="d-flex p10 g10 user-card">
            <img src={user.image} alt=""/>
            <div className="d-flex f-col g10 space-btw">
                <b>{user.username}</b>
                <button onClick={sendRequest}>Send battle request</button>
            </div>
        </div>
    );
};

export default SingleUserCard;