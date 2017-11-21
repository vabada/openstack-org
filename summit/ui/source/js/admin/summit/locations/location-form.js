import React from 'react';
import { connect } from 'react-redux';
import { saveItem } from './actions';
import { AjaxLoader } from '~core-components/ajaxloader';
import Message from '~core-components/message';
import SimpleForm from '~core-components/simpleform';


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
        this.props.saveItem();
    }

    render() {

        let {summit_location} = this.state;
        let fields = [
            {
                inputs: [
                    { name: 'name', value: summit_location.name },
                    { name: 'display', value: summit_location.display, type: 'checkbox', wrapper_class: 'checkbox' },
                ]
            },
            {
                inputs: [
                    { name: 'description', value: summit_location.description },
                ]
            },
            {
                inputs: [
                    { name: 'websiteurl', value: summit_location.websiteurl },
                ]
            },
            {
                inputs: [
                    { name: 'address1', value: summit_location.address1 },
                    { name: 'address2', value: summit_location.address2 },
                ]
            },
            {
                inputs: [
                    { name: 'zipcode', value: summit_location.zipcode },
                    { name: 'city', value: summit_location.city },
                    { name: 'state', value: summit_location.state },
                    { name: 'country', value: summit_location.country }
                ]
            },
            {
                inputs: [
                    { name: 'lng', value: summit_location.lng },
                    { name: 'lat', value: summit_location.lat },
                ]
            },
            {
                inputs: [
                    { name: 'message', value: summit_location.message },
                    {
                        name: 'show_details',
                        value: summit_location.show_details,
                        type: 'checkbox',
                        label: 'Send people to a details page first?',
                        wrapper_class: 'checkbox'
                    }
                ]
            },
            {
                inputs: [
                    {
                        name: 'images',
                        type: 'upload',
                        label: 'Upload Images',
                        handleUpload: this.props.handleUpload
                    }
                ]
            },
        ];

        if (this.props.type == 'venue') {
            fields.push({
                inputs: [

                ]
            });
        } else if (this.props.type == 'hotel') {

        } else if (this.props.type == 'airport') {

        } else if (this.props.type == 'external') {

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
        saveItem () {
            console.log('saveItem');
            return dispatch(saveItem({ summit_location: this.summit_location }));
        },
        handleUpload () {
            console.log('file uploaded');
        }
    })
)(LocationForm);
