import React, {useEffect, useState} from 'react';
import BattleUserCard from "../components/BattleUserCard";
import {socket} from "../App";
import {useDispatch, useSelector} from "react-redux";
import {changeMoney, countDown, setPlayer1, setPlayer2, setTimer, setTurn} from "../features/user";
import {useNavigate} from "react-router-dom";

const Arena = () => {

    const dispatch = useDispatch();
    const nav = useNavigate();
    const timer = useSelector(state => state.timer);
    const room = useSelector(state => state.room);
    const username = useSelector(state => state.username);
    const player1 = useSelector(state => state.player1);
    const player2 = useSelector(state => state.player2);
    const turn = useSelector(state => state.turn);
    const [prize, setPrize] = useState(0);
    const [winner, setWinner] = useState(null);

    useEffect(() => {
        if (!sessionStorage.getItem("token")) {
            nav("/");
            return;
        }
        if (!username) return;
        let currentPlayer = "player1";
        if (username === player2.username) {
            currentPlayer = "player2";
        }
        socket.on("attackResults", val => {
            dispatch(setPlayer1(val.player1));
            dispatch(setPlayer2(val.player2));
            dispatch(setTurn(val.turn));
            if (val.gameOver) {
                if (val.player1.hp === 0) {
                    setWinner({username: val.player2.username, gold: val.player2.gold});
                    if (currentPlayer === "player2") dispatch(changeMoney(val.player2.gold));
                } else {
                    setWinner({username: val.player1.username, gold: val.player1.gold});
                    if (currentPlayer === "player1") dispatch(changeMoney(val.player1.gold));
                }
            }
            if (currentPlayer === "player1") {
                setPrize(val.player1.gold)
            } else {
                setPrize(val.player2.gold)
            }
        })
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
                        <button className="btn-large" onClick={hit}>{turn === username ? "HIT" : `Wait for ${turn} to hit`}</button>
                        <div className="text-center">
                            <p>Turn ends in:</p>
                            <h1>{timer}</h1>
                        </div>
                    </div>}
                {player2 && <BattleUserCard player={player2}/>}
            </div>
        </div>
    );
};

export default Arena;