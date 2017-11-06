import React from 'react';

const GenericInput = (props) => {
    let {input, handleChange, label, wrapper_class, input_class, type} = props;

    return (
        <div className={wrapper_class}>
            <label htmlFor={input.name}>{label}</label>
            <input
                type={type}
                className={ "form-control " + input_class }
                name={input.name}
                value={input.value}
                onChange={handleChange}
            />
        </div>
    );
};

export default GenericInput;
