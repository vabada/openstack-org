import React from 'react';

const CheckboxInput = (props) => {
    let {input, handleChange, label, wrapper_class, input_class, type} = props;

    return (
        <div className={wrapper_class}>
            <input
                type={type}
                className={ "form-control " + input_class }
                name={input.name}
                checked={input.value ? true : false}
                onChange={handleChange}
            />
            <label htmlFor={input.name}>{label}</label>
        </div>
    );
};

export default CheckboxInput;
