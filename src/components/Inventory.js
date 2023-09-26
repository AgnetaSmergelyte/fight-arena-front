import React, {useEffect, useState} from 'react';
import InventoryItem from "./InventoryItem";
import {useDispatch, useSelector} from "react-redux";
import {socket} from "../App";
import {changeMoney} from "../features/user";

const Inventory = () => {

    const dispatch = useDispatch();
    const inventory = useSelector(state => state.inventory);
    const money = useSelector(state => state.money);
    const [newItems, setNewItems] = useState([]);
    const [selectedItems, setSelectedItems] = useState([null, null, null]);
    const [generateError, setGenerateError] = useState('');
    const [selectError, setSelectError] = useState('');

    useEffect(() => {
        socket.on('items', val => {
            setNewItems(val);
            dispatch(changeMoney(money - 100));
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
        <div className="d-flex f-col g10">
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
                                       selectedItems={selectedItems}
                                       setSelectedItems={setSelectedItems}/>)}
                </div>
                <b className="text-red mb-10">{selectError}</b>
                <div className="d-flex p10 g10 selected-items j-center">
                    {selectedItems.map((x, i) => <div key={i}>{x && <InventoryItem item={x} take={false} taken={true} />}</div>)}
                </div>
            </div>
        </div>
    );
};

export default Inventory;