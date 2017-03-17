import React from 'react';

const StatusMessage = ({
    type,
    message
}) => (
    <div className="row">
        <div className="col-lg-12">
            <div className={`alert alert-${type}`} role="alert">
                {message}
            </div>
        </div>
    </div>
);

StatusMessage.PropTypes = {
    type: React.PropTypes.string,
    message: React.PropTypes.string,
};

export default StatusMessage;
