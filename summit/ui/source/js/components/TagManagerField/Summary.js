import React from 'react';

const Summary = ({
    limit,
    selected
}) => (
    <div className="panel panel-default">
        <div className="panel-heading">Tags You have Selected</div>
        <div className="panel-body">
            <h4>{selected} of {limit} tags</h4>
        </div>
        {limit === selected &&
        <ul className="list-group">
            <li className="list-group-item">
                You have selected the maximum number of tags.
            </li>
        </ul>
        }
    </div>
);

Summary.PropTypes = {
    limit: React.PropTypes.number,
    selected: React.PropTypes.number
};

export default Summary;
