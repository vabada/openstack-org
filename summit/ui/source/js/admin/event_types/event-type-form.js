import React from 'react';
import { connect } from 'react-redux';
import { saveEventType } from './actions';
import { AjaxLoader } from '~core-components/ajaxloader';
import Message from "~core-components/message";
import SimpleForm from "~core-components/simpleform";

class EventTypeForm extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {
            event_type: props.event_type,
            loading: props.loading,
            msg: props.msg,
            msg_type: props.msg_type
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const value = (event.target.type === 'checkbox') ? event.target.checked : event.target.value;
        this.state.event_type[event.target.name] = value;
        this.setState({event_type: this.state.event_type});
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.saveEventType();
    }

    render() {

        let {event_type} = this.state;
        let fields = [
            {
                inputs: [
                    { name: 'type', value: event_type.type },
                ]
            },
            {
                inputs: [
                    {
                        name: 'use_sponsors',
                        value: event_type.use_sponsors,
                        type: 'checkbox',
                        label: 'Use Sponsors',
                        wrapper_class: 'checkbox'
                    }
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
        saveEventType () {
                console.log('saveEventType');
                return dispatch(saveEventType({ event_type: this.event_type }));
            }
        })
    )(EventTypeForm);
