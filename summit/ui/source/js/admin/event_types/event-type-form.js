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
        this.props.saveEventType(this.props.type, this.state.event_type);
    }

    render() {

        let {event_type} = this.state;
        let fields = [
            {
                inputs: [
                    { name: 'type_class', value: this.props.type, type: 'hidden' },
                    { name: 'type', value: event_type.type },
                    { name: 'color', value: event_type.color }
                ]
            },
            {
                inputs: [
                    {name: 'use_sponsors', value: event_type.use_sponsors, type: 'checkbox', label: 'Use Sponsors', wrapper_class: 'checkbox'},
                    {name: 'blackout', value: event_type.blackout, type: 'checkbox', wrapper_class: 'checkbox' },
                    {name: 'sponsors_mandatory', value: event_type.sponsors_mandatory, type: 'checkbox', label: 'Sponsors Mandatory', wrapper_class: 'checkbox'}
                ]
            }
        ];

        if (this.props.type == 'presentation') {
            fields.push({
                inputs: [
                    {name: 'available_cfp', value: event_type.available_cfp, type: 'checkbox', label: 'Available on CPF', wrapper_class: 'checkbox'},
                    {name: 'use_speakers', value: event_type.use_speakers, type: 'checkbox', label: 'Use Speakers', wrapper_class: 'checkbox'},
                    {name: 'speakers_mandatory', value: event_type.speakers_mandatory, type: 'checkbox', label: 'Speakers Mandatory', wrapper_class: 'checkbox'}
                ]
            });

            fields.push({
                inputs: [
                    {name: 'min_speakers', value: event_type.min_speakers, type: 'number', label: 'Min Speakers'},
                    {name: 'max_speakers', value: event_type.max_speakers, type: 'number', label: 'Max Speakers'}
                ]
            });

            fields.push({
                inputs: [
                    {name: 'use_moderator', value: event_type.use_moderator, type: 'checkbox', label: 'Use Moderator', wrapper_class: 'checkbox'},
                    {name: 'moderator_mandatory', value: event_type.moderator_mandatory, type: 'checkbox', label: 'Moderator Mandatory', wrapper_class: 'checkbox'}
                ]
            });

            fields.push({
                inputs: [
                    {name: 'min_moderators', value: event_type.min_moderators, type: 'number', label: 'Min Moderators'},
                    {name: 'max_moderators', value: event_type.max_moderators, type: 'number', label: 'Max Moderators'},
                    {name: 'moderator_label', value: event_type.moderator_label, label: 'Moderator Label'}
                ]
            });
        } else {
            fields[1].inputs.push({
                name: 'attachment',
                value: event_type.attachment,
                type: 'checkbox',
                label: 'Allows Attachment',
                wrapper_class: 'checkbox'
            });
        }

        return (
            <div>
                <Message />
                <AjaxLoader show={this.props.loading} />
                <h2>Type: {this.props.type}</h2>
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
        saveEventType (type, event_type) {
                console.log('saveEventType');
                return dispatch(saveEventType({ type, event_type }));
            }
        })
    )(EventTypeForm);
