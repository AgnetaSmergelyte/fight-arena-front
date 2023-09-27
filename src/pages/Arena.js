import React, {useEffect} from 'react';
import BattleUserCard from "../components/BattleUserCard";
import {socket} from "../App";
import {useSelector} from "react-redux";

const Arena = () => {

    const room = useSelector(state => state.room);
    const player1 = useSelector(state => state.player1);
    const player2 = useSelector(state => state.player2);

    useEffect(() => {
        console.log(room)
        socket.on("details", val => {
            console.log(val)
        })
    }, [])

    function hit() {
        socket.emit("hit", room);
    }

    return (
        <div className="container">
            <div className="arena d-flex w-100">
                {player1 && <BattleUserCard player={player1} />}
                <div className="flex-1 d-flex a-center j-center">
                    <button className="btn-large" onClick={hit}>Hit</button>
                </div>
                {player2 && <BattleUserCard player={player2} />}
            </div>
        </div>
    );
};

export default Arena;