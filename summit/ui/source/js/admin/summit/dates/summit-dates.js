import React from 'react';
import { connect } from 'react-redux';
import { saveSummitDates } from './actions';
import { AjaxLoader } from '~core-components/ajaxloader';
import Message from "~core-components/message";

class summitDatesApp extends React.Component
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
        this.props.saveSummitDates();
    }

    render() {

        return (
            <div>
                <Message />
                <AjaxLoader show={this.props.loading} />
                <form onSubmit={this.handleSubmit}>
                    <div className="row form-group">
                        <div className="col-md-12">
                            <label htmlFor="time_zone">Time Zone</label>
                            <input type="text" className="form-control" name="time_zone" value={summit.time_zone} onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="row form-group">
                        <div className="col-md-6">
                            <div className="checkbox">
                                <input type="checkbox" name="begin_date" checked={summit.begin_date} onChange={this.handleChange} />
                                <label htmlFor="begin_date">Begin</label>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="checkbox">
                                <input type="checkbox" name="finish_date" checked={summit.end_date} onChange={this.handleChange} />
                                <label htmlFor="finish_date">Finish</label>
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
        saveSummitDates () {
            console.log('saveSummitDates');
            return dispatch(saveSummitDates({ summit: this.summit }));
        }
    })
)(summitDatesApp);
