import React from 'react';
import { connect } from 'react-redux';
import { saveSummitMainData } from './actions';
import { AjaxLoader } from '~core-components/ajaxloader';
import Message from "~core-components/message";

class SummitMainDataApp extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {
            summit: props.summit,
            loading: props.loading,
            msg: props.msg,
            msg_type: props.msg_type
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const value = (event.target.type === 'checkbox') ? event.target.checked : event.target.value;
        this.state.summit[event.target.name] = value;
        this.setState({summit: this.state.summit});
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.saveSummitMainData();
    }

    render() {

        return (
            <div>
                <Message />
                <AjaxLoader show={this.props.loading} />
                <form onSubmit={this.handleSubmit}>
                    <div className="row form-group">
                        <div className="col-md-6">
                            <label htmlFor="title">Title</label>
                            <input type="text" className="form-control" name="title" value={summit.title} onChange={this.handleChange} />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="page_link">Page Link</label>
                            <input type="text" className="form-control" name="page_link" value={summit.link} onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="row form-group">
                        <div className="col-md-6">
                            <div className="checkbox">
                                <input type="checkbox" name="active" checked={summit.active} onChange={this.handleChange} />
                                <label htmlFor="active">Active</label>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="checkbox">
                                <input type="checkbox" name="available_api" checked={summit.available_api} onChange={this.handleChange} />
                                <label htmlFor="available_api">Availabe for API</label>
                            </div>
                        </div>
                    </div>
                    <div className="row form-group">
                        <div className="col-md-6">
                            <label htmlFor="max_submissions">Eventbrite Event Id</label>
                            <input type="text" className="form-control" name="eventbrite_id" value={summit.eventbrite_id} onChange={this.handleChange} />
                        </div>

                        <div className="col-md-6">
                            <label htmlFor="max_submissions">Max Submissions per User</label>
                            <input type="text" className="form-control" name="max_submissions" value={summit.max_submissions} onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="row form-group">
                        <div className="col-md-6">
                            <label htmlFor="date_label">Date Label</label>
                            <input type="text" className="form-control" name="date_label" value={summit.date_label} onChange={this.handleChange} />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="coming_soon_label">Coming Soon Btn Text</label>
                            <input type="text" className="form-control" name="coming_soon_label" value={summit.coming_soon_label} onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="row form-group">
                        <div className="col-md-4">
                            <label htmlFor="registration_link">Registration Link</label>
                            <input type="text" className="form-control" name="registration_link" value={summit.registration_link} onChange={this.handleChange} />
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="registration_link_2">Secondary Registration Link</label>
                            <input type="text" className="form-control" name="registration_link_2" value={summit.registration_link_2} onChange={this.handleChange} />
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="registration_label_2">Secondary Registration Label</label>
                            <input type="text" className="form-control" name="registration_label_2" value={summit.registration_label_2} onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <input type="submit" className="btn btn-primary" defaultValue="Save" />
                        </div>
                    </div>
                </form>
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
        saveSummitMainData () {
            console.log('saveSummitMainData');
            return dispatch(saveSummitMainData({ summit: this.summit }));
        }
    })
)(SummitMainDataApp);
