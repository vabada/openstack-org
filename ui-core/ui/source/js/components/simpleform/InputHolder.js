import React from 'react';
import HiddenInput from './HiddenInput';
import CheckboxInput from './CheckboxInput';
import GenericInput from './GenericInput';

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

        let input_html = null;
        if (input.type == 'hidden') {
            input_html = <HiddenInput input={input} />;
        } else if (input.type == 'checkbox'){
            input_html = <CheckboxInput
                            input={input}
                            wrapper_class={colClass(row_length) + ' ' + getClass(input.wrapper_class)}
                            input_class= {getClass(input.class)}
                            type={getType(input)}
                            handleChange={handleChange}
                            label={getLabel(input)}
                        />;
        } else {
            input_html = <GenericInput
                            input={input}
                            wrapper_class={colClass(row_length) + ' ' + getClass(input.wrapper_class)}
                            input_class= {getClass(input.class)}
                            type={getType(input)}
                            handleChange={handleChange}
                            label={getLabel(input)}
                         />;
        }

        return (
            <div>{input_html}</div>
        );
    }

}
