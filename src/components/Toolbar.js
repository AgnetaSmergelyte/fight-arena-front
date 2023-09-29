import React from 'react';
import {NavLink, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {changeId, changeMoney, changeUsername, setInventory} from "../features/user";
import {socket} from "../App";

const Toolbar = () => {
    const nav = useNavigate();
    const dispatch = useDispatch();
    const username = useSelector(state => state.username);
    const money = useSelector(state => state.money);
    function logout() {
        localStorage.removeItem("autologin");
        sessionStorage.removeItem("token");
        dispatch(changeId(''));
        dispatch(changeUsername(''));
        dispatch(changeMoney(0));
        dispatch(setInventory([]));
        socket.emit("logout");
        nav("/");
    }

    return (
        <div>
            {username ?
                <div className="toolbar space-btw a-center">
                    <em>Logged in as: <b>{username}</b></em>
                    <b>Money: {money}$</b>
                    <button onClick={logout}>Log Out</button>
                </div> :
                <div className="toolbar a-center g10">
                    <NavLink className="menu-item" to="/register">Sign Up</NavLink>
                    <NavLink className="menu-item" to="/">Log In</NavLink>
                </div>
            }
        </div>
    );
};

export default Toolbar;