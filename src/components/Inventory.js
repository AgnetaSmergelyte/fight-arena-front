import React, {useEffect, useState} from 'react';
import InventoryItem from "./InventoryItem";
import {useDispatch, useSelector} from "react-redux";
import {socket} from "../App";
import {setInventory, setMoney, setSelectedItems} from "../features/user";

const Inventory = () => {

    const dispatch = useDispatch();
    const inventory = useSelector(state => state.inventory);
    const money = useSelector(state => state.money);
    const selectedItems = useSelector(state => state.selectedItems);
    const [newItems, setNewItems] = useState([]);
    const [generateError, setGenerateError] = useState('');

    useEffect(() => {
        socket.on('items', val => {
            setNewItems(val.items);
            dispatch(setMoney(val.money));
        });
        socket.on('inventory', val => {
            dispatch(setInventory(val));
        });
    }, [])

    function generateNewItems() {
        if (money < 100) {
            setGenerateError('Not Enough Money');
            return;
        }
        socket.emit("generateItems");
    }

    return (
        <div className="d-flex f-col g10 flex-1">
            <div className="section p10 d-flex f-col a-center">
                <div className="inventory d-flex space-even p10 g10">
                    {newItems.map((x, i) =>
                        <InventoryItem key={i}
                                       item={x}
                                       take={true}
                                       newItems={newItems}
                                       setNewItems={setNewItems}
                        />)}
                </div>
                <b className="text-red mb-10">{generateError}</b>
                <button className="btn-dark" onClick={generateNewItems}>Generate 100$</button>

            </div>
            <div className="section">
                <div className="inventory d-flex f-wrap p10 g10">
                    {inventory.map((x, i) =>
                        <InventoryItem key={i}
                                       item={x}
                                       take={false}
                        />)}
                </div>
                <div className="d-flex p10 g10 selected-items j-center">
                    {selectedItems.map((x, i) => <div key={i}>{x &&
                        <InventoryItem item={x} take={false} taken={true}/>}</div>)}
                </div>
            </div>
        </div>
    );
};

export default Inventory;