import React from 'react';

const AlertBox = ({alert, setAlert}) => {
    return (
        <div className="request">
            <div className="p10 d-flex f-col a-center g10">
                <h3 className="mb-10">{alert}</h3>
                <button className="btn-send" onClick={() => setAlert(null)}>OK</button>
            </div>
        </div>
    );
};

export default AlertBox;