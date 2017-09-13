import React from 'react';

export default class SimpleForm extends React.Component {

    constructor (props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    colClass(field_count) {
        let _class = 'col-md-';
        let _size = 12 / field_count;
        return _class + _size;
    }


    render () {
        const {fields, handleChange, handleSubmit} = this.props;
        return (
            <form onSubmit={handleSubmit}>
            {fields.map(row => (
                <div className={ "row form-group " + row.class }>
                {row.inputs.map(input => (
                    <div className={colClass(row.inputs.length) + ' ' + input.wrapper_class}>
                        <label htmlFor={input.name}>{input.label}</label>
                        <input type={input.type} className={ "form-control " + input.class } name={input.name} value={input.value} onChange={handleChange} />
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
