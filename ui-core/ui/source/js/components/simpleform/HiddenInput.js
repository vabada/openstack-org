import React from 'react';

const HiddenInput = (props) => {
    let {input} = props;

    return (
        <input type="hidden" name={input.name} value={input.value} />
    );
};

export default HiddenInput;
