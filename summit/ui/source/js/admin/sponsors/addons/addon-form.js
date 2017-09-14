import React from 'react';
import { connect } from 'react-redux';
import { saveAddOn } from './actions';
import { AjaxLoader } from '~core-components/ajaxloader';
import Message from "~core-components/message";
import SimpleForm from "~core-components/simpleform";

class AddOnForm extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {
            summit_addon: props.summit_addon,
            loading: props.loading,
            msg: props.msg,
            msg_type: props.msg_type
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const value = (event.target.type === 'checkbox') ? event.target.checked : event.target.value;
        this.state.summit_addon[event.target.name] = value;
        this.setState({summit_addon: this.state.summit_addon});
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.saveAddOn();
    }

    render() {

        let {summit_addon} = this.state;
        let fields = [
            {
                inputs: [
                    { name: 'title', value: summit_addon.title }
                ]
            },
            {
                inputs: [
                    { name: 'cost', value: summit_addon.cost },
                    {
                        name: 'show_qty',
                        value: summit_addon.show_qty,
                        type: 'checkbox',
                        label: 'Show Quantity',
                        wrapper_class: 'checkbox'
                    }
                ]
            },
            {
                inputs: [
                    { name: 'available', value: summit_addon.available, type: 'number', label: 'Currently Available' },
                    { name: 'max_available', value: summit_addon.max_available, type: 'number', label: 'Max Available' }
                ]
            }
        ];

        return (
            <div>
                <Message />
                <AjaxLoader show={this.props.loading} />
                <SimpleForm fields={fields} handleChange={this.handleChange} handleSubmit={this.handleSubmit} />
            </div>
        );
    }
}

export default connect (
    state => {
        return {
            loading: state.loading,
            msg: state.msg,
            msg_type: state.msg_type
        }
    },
    dispatch => ({
        saveAddOn () {
            console.log('saveAddOn');
            return dispatch(saveAddOn({ summit_addon: this.summit_addon }));
        }
    })
)(AddOnForm);
