import React from 'react';

const SingleUserCard = ({user}) => {
    return (
        <div>
            <b>{user.username}</b>
        </div>
    );
};

export default SingleUserCard;