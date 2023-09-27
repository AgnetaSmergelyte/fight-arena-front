import React from 'react';
import {useSelector} from "react-redux";

const BattleUserCard = ({player}) => {
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
                {player.potion && <img src={player.potion.image} alt="potion"/>}
            </div>
        </div>
    );
};

export default BattleUserCard;