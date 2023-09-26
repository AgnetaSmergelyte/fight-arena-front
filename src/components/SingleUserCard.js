import React from 'react';

const SingleUserCard = ({user}) => {
    return (
        <div className="d-flex p10 g10 user-card">
            <img src={user.image} alt=""/>
            <div className="d-flex f-col g10 space-btw">
                <b>{user.username}</b>
                <button>Send battle request</button>
            </div>
        </div>
    );
};

export default SingleUserCard;