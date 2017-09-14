import React from 'react';

export default class InputHolder extends React.Component {

    colClass(field_count) {
        let _class = 'col-md-';
        let _size = 12 / field_count;
        return _class + _size;
    }

    getLabel(field) {
        if (field.label) return field.label;
        else return field.name.charAt(0).toUpperCase() + field.name.slice(1);
    }

    getType(field) {
        if (field.type) return field.type;
        else return 'text';
    }

    getClass(the_class) {
        return (typeof the_class == 'undefined') ? '' : the_class;
    }

    render () {
        const {input, row_length, handleChange} = this.props;
        const {colClass, getClass, getType, getLabel} = this;

        return (
            <div className={colClass(row_length) + ' ' + getClass(input.wrapper_class)}>
                {input.type != 'checkbox' &&
                    <div>
                        <label htmlFor={input.name}>{getLabel(input)}</label>
                        <input
                            type={getType(input)}
                            className={ "form-control " + getClass(input.class) }
                            name={input.name}
                            value={input.value}
                            onChange={handleChange}
                        />
                    </div>
                }

                {input.type == 'checkbox' &&
                    <div>
                        <input
                            type={getType(input)}
                            className={ "form-control " + getClass(input.class) }
                            name={input.name}
                            checked={input.value ? true : false}
                            onChange={handleChange}
                        />
                        <label htmlFor={input.name}>{getLabel(input)}</label>
                    </div>
                }
            </div>
        );
    }

}
