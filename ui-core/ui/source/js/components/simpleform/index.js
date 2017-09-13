import React from 'react';

// fields structure
/*

 let fields = [
    {
        class: 'rowClass',
        inputs: [
            {
                wrapper_class: 'wrapperClass',
                name: 'title',
                label: 'Title',
                type: 'text',
                class: 'inputClass',
                value: this.state.title
            }
        ]
    }
 ];

 */

export default class SimpleForm extends React.Component {

    constructor (props) {
        super(props);
    }

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

    render () {
        const {fields, handleChange, handleSubmit, children} = this.props;
        return (
            <form onSubmit={handleSubmit}>
            {fields.map((row,i) => (
                <div key={i} className={ "row form-group " + row.class }>
                {row.inputs.map((input,j) => (
                    <div key={j} className={this.colClass(row.inputs.length) + ' ' + input.wrapper_class}>
                        <label htmlFor={input.name}>{this.getLabel(input)}</label>
                        <input
                            type={this.getType(input)}
                            className={ "form-control " + input.class }
                            name={input.name}
                            value={input.value}
                            onChange={handleChange}
                        />
                    </div>
                ))}
                </div>
            ))}
                {children}

                <div className="row">
                    <div className="col-md-12">
                        <input type="submit" className="btn btn-primary" defaultValue="Save" />
                    </div>
                </div>
            </form>
        );
    }

}
