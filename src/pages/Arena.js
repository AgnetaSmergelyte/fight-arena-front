import React, {useEffect} from 'react';
import BattleUserCard from "../components/BattleUserCard";
import {socket} from "../App";
import {useDispatch, useSelector} from "react-redux";
import {countDown, setTimer} from "../features/user";
import {useNavigate} from "react-router-dom";

const Arena = ({prize, winner}) => {
    const dispatch = useDispatch();
    const nav = useNavigate();
    const timer = useSelector(state => state.timer);
    const room = useSelector(state => state.room);
    const username = useSelector(state => state.username);
    const player1 = useSelector(state => state.player1);
    const player2 = useSelector(state => state.player2);
    const turn = useSelector(state => state.turn);

    useEffect(() => {
        if (!sessionStorage.getItem("token")) nav("/");
        if (!username) nav("/");
    }, [])

    useEffect(() => {
        dispatch(setTimer(20))
        const interval = setInterval(() => {
            dispatch(countDown());
        }, 1000);
        return () => clearInterval(interval);
    }, [turn])

    function hit() {
        socket.emit("attack", room);
    }

    return (
        <div className="container">
            <div className="arena d-flex w-100">
                {player1 && <BattleUserCard player={player1}/>}
                {winner ?
                    <div className="flex-1 d-flex f-col a-center space-even">
                        <h2>{winner.username} WON!</h2>
                        <h4>Money won: {winner.gold}$</h4>
                        <button className="btn-large" onClick={() => nav("/lobby")}>Go Back To Lobby</button>
                    </div> :
                    <div className="flex-1 d-flex f-col a-center space-even">
                        <h2>Prize: {prize}$</h2>
                        <button className="btn-large"
                                onClick={hit}>{turn === username ? <h1>HIT</h1> : `Wait for ${turn} to hit`}</button>
                        {timer > -1 ?
                            <div className="text-center">
                                <p>Turn ends in:</p>
                                <h1>{timer}</h1>
                            </div> :
                            <div className="text-center d-flex f-col a-center">
                                <p className="mb-10">Other user disconnected.</p>
                                <button className="btn-large" onClick={() => nav("/lobby")}>Go Back To Lobby</button>
                            </div>
                        }
                    </div>}
                {player2 && <BattleUserCard player={player2}/>}
            </div>
        </div>
    );
};

export default Arena;