import React from 'react';
import InputHolder from './InputHolder';
import './simpleform.less';

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

    getClass(the_class) {
        return (typeof the_class == 'undefined') ? '' : the_class;
    }

    render () {
        const {fields, handleChange, handleSubmit, children} = this.props;
        return (
            <form onSubmit={handleSubmit}>
            {fields.map((row,i) => (
                <div key={i} className={ "row form-group " + this.getClass(row.class) }>
                {row.inputs.map((input,j) => (
                    <InputHolder input={input} key={j} row_length={row.inputs.length} handleChange={handleChange} />
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
