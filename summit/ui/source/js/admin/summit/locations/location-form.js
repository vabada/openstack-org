import React from 'react';
import { connect } from 'react-redux';
import { saveItem } from './actions';
import { AjaxLoader } from '~core-components/ajaxloader';
import Message from "~core-components/message";
import SimpleForm from "~core-components/simpleform";

class LocationForm extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {
            summit_location: props.summit_location,
            loading: props.loading,
            msg: props.msg,
            msg_type: props.msg_type
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const value = (event.target.type === 'checkbox') ? event.target.checked : event.target.value;
        this.state.summit_location[event.target.name] = value;
        this.setState({summit_location: this.state.summit_location});
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.savePackage();
    }

    render() {

        let {summit_location} = this.state;
        let fields = [
            {
                inputs: [
                    { name: 'title', value: summit_location.title },
                    { name: 'subtitle', value: summit_location.subtitle }
                ]
            },
            {
                inputs: [
                    { name: 'cost', value: summit_location.cost, type: 'number' },
                    {
                        name: 'show_qty',
                        value: summit_location.show_qty,
                        type: 'checkbox',
                        label: 'Show Quantity',
                        wrapper_class: 'checkbox'
                    }
                ]
            },
            {
                inputs: [
                    { name: 'available', value: summit_location.available, type: 'number', label: 'Currently Available' },
                    { name: 'max_available', value: summit_location.max_available, type: 'number', label: 'Max Available' }
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
        savePackage () {
            console.log('savePackage');
            return dispatch(savePackage({ summit_location: this.summit_location }));
        }
    })
)(LocationForm);
