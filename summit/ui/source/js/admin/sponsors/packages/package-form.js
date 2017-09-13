import React from 'react';
import { connect } from 'react-redux';
import { savePackage } from './actions';
import { AjaxLoader } from '~core-components/ajaxloader';
import Message from "~core-components/message";
import SimpleForm from "~core-components/simpleform";

class PackageForm extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {
            summit_package: props.summit_package,
            loading: props.loading,
            msg: props.msg,
            msg_type: props.msg_type
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const value = (event.target.type === 'checkbox') ? event.target.checked : event.target.value;
        this.state.summit_package[event.target.name] = value;
        this.setState({summit_package: this.state.summit_package});
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.savePackage();
    }

    render() {

        let {summit_package} = this.state;
        let fields = [
            {
                class: 'rowClass',
                inputs: [
                    { name: 'title', value: summit_package.title },
                    { name: 'cost', value: summit_package.cost }
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
            return dispatch(savePackage({ summit_package: this.summit_package }));
        }
    })
)(PackageForm);
