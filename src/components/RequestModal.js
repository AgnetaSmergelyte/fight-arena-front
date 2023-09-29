import React from 'react';
import {socket} from "../App";
import {useSelector} from "react-redux";

const RequestModal = ({request, setRequest, setAlert}) => {
    const selectedItems = useSelector(state => state.selectedItems);
    function cancelRequest() {
        socket.emit("cancelRequest", request.socketId);
        setRequest(null);
    }
    function agreeToRequest() {
        if (selectedItems[0] === null) {
            setAlert('Select your weapon first');
            setRequest(null);
            return;
        }
        socket.emit("acceptRequest", {inventory: selectedItems, player1: request});
        setRequest(null);
    }

    return (
        <div className="request">
            <div className="p10">
                <h3 className="mb-10">{request.username} challenges you to a fight. Do you agree?</h3>
                <div className="d-flex space-even p10 g10">
                    <button className="btn-send" onClick={cancelRequest}>Cancel</button>
                    <button className="btn-send" onClick={agreeToRequest}>OK</button>
                </div>
            </div>
        </div>
    );
};

export default RequestModal;