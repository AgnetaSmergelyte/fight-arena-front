import React, {useState} from 'react';
import {socket} from "../App";
import {useDispatch, useSelector} from "react-redux";
import {setSelectedItems} from "../features/user";

const InventoryItem = ({item, take, newItems, setNewItems, taken}) => {

    const dispatch = useDispatch();
    const selectedItems = useSelector(state => state.selectedItems);
    const [showProperties, setShowProperties] = useState(false);

    function takeItem(){
        socket.emit("takeItem", item);
        const filteredItems = newItems.filter(x => x !== item);
        setNewItems(filteredItems);
    }

    function removeFromInventory() {
        socket.emit("removeItem", item);
        const newArr = [...selectedItems];
        selectedItems.map((x, i) => {
            if (x !== null && x.id === item.id) {
                newArr[i] = null;
            }
        })
        dispatch(setSelectedItems(newArr));
    }

    function selectItem(){
        if (take || taken) return;
        const newArr = [...selectedItems];
        if (item.type === "weapon") {
            newArr[0] = item;
        } else if (item.type === "armor") {
            newArr[1] = item;
        } else {
            newArr[2] = item;
        }
        dispatch(setSelectedItems(newArr));
    }

    return (
        <div className="d-flex f-col a-center">
            <div className="inventory-item">
                <img src={item.image} alt={item.type} onClick={selectItem} onMouseOver={() => setShowProperties(true)}
                     onMouseOut={() => setShowProperties(false)}/>
                {showProperties &&
                    <div className="item-properties">
                        <div className="no-click">
                            {item.type === "potion" &&
                                <div>
                                    <b>Potion</b>
                                    <p>Restores {item.power}HP</p>
                                </div>}
                            {item.type === "weapon" &&
                                <div>
                                    <b>Weapon</b>
                                    <p>Grade: {item.grade}</p>
                                    <p>Max damage: {item.power}</p>
                                    <p>Max gold per hit: {item.gold}</p>
                                    {item.effectSlots.map((x, i) => <p key={i}>{x.name + ': ' + x.chance + '%'}</p>)}
                                </div>}
                            {item.type === "armor" &&
                                <div>
                                    <b>Armor</b>
                                    <p>Grade: {item.grade}</p>
                                    <p>Max shielding: {item.power}%</p>
                                    {item.effectSlots.map((x, i) => <p key={i}>{x.name + ': ' + x.chance + '%'}</p>)}
                                </div>}
                        </div>
                    </div>}
                {!take && !taken && <button className="btn-delete" onClick={removeFromInventory}>Remove</button>}
            </div>
            {take && <button className="btn-dark btn-small" onClick={takeItem}>Take</button>}
        </div>
    );
};

export default InventoryItem;