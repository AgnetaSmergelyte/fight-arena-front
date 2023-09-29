import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {socket} from "../App";
import {setSelectedItems} from "../features/user";

const BattleUserCard = ({player}) => {
    const dispatch = useDispatch();
    const username = useSelector(state => state.username);
    const room = useSelector(state => state.room);
    const selectedItems = useSelector(state => state.selectedItems);
    function drinkPotion() {
        socket.emit("potion", room);
        const newArr = [...selectedItems];
        newArr[2] = null;
        dispatch(setSelectedItems(newArr));
    }

    return (
        <div className="battle-card">
            <h2>{player.username}</h2>
            <img src={player.image} alt="user-img"/>
            <div className="progress-bar">
                <div className="progress" style={{width: `${player.hp}%`}}></div>
            </div>
            <div className="weapons">
                {player.weapon && <img src={player.weapon.image} alt="weapon"/>}
                {player.armor && <img src={player.armor.image} alt="armor"/>}
                {player.potion && <img src={player.potion.image} alt="potion" />}
            </div>
            {player.potion && username === player.username &&
                <button className="btn-dark btn-small" onClick={drinkPotion}>Drink potion +{player.potion.power}HP</button>}
        </div>
    );
};

export default BattleUserCard;