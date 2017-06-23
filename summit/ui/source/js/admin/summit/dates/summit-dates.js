import React from 'react';
import { connect } from 'react-redux';
import { saveSummitDates } from './actions';
import { AjaxLoader } from '~core-components/ajaxloader';
import Message from "~core-components/message";

class SummitDatesApp extends React.Component
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
                        <div className="col-md-6">
                            <label htmlFor="time_zone">Time Zone</label>
                            <input type="text" className="form-control" name="time_zone" value={summit.time_zone} onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="row form-group">
                        <div className="col-md-6">
                            <label htmlFor="begin_date">Begin</label>
                            <input type="text" className="form-control" name="begin_date" value={summit.begin_date} onChange={this.handleChange} />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="finish_date">Finish</label>
                            <input type="text" className="form-control" name="finish_date" value={summit.finish_date} onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="row form-group">
                        <div className="col-md-6">
                            <label htmlFor="venues_date">Venues Show From</label>
                            <input type="text" className="form-control" name="venues_date" value={summit.venues_date} onChange={this.handleChange} />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="default_date">Default Start Date</label>
                            <input type="text" className="form-control" name="default_date" value={summit.default_date} onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="row form-group">
                        <div className="col-md-6">
                            <label htmlFor="submissions_begin">Submissions Begin</label>
                            <input type="text" className="form-control" name="submissions_begin" value={summit.submissions_begin} onChange={this.handleChange} />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="submissions_finish">Submissions Finish</label>
                            <input type="text" className="form-control" name="submissions_finish" value={summit.submissions_finish} onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="row form-group">
                        <div className="col-md-6">
                            <label htmlFor="voting_begin">Voting Begin</label>
                            <input type="text" className="form-control" name="voting_begin" value={summit.voting_begin} onChange={this.handleChange} />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="voting_finish">Voting Finish</label>
                            <input type="text" className="form-control" name="voting_finish" value={summit.voting_finish} onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="row form-group">
                        <div className="col-md-6">
                            <label htmlFor="selections_begin">Selections Begin</label>
                            <input type="text" className="form-control" name="selections_begin" value={summit.selections_begin} onChange={this.handleChange} />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="selections_finish">Selections Finish</label>
                            <input type="text" className="form-control" name="selections_finish" value={summit.selections_finish} onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="row form-group">
                        <div className="col-md-6">
                            <label htmlFor="registration_begin">Registration Begin</label>
                            <input type="text" className="form-control" name="registration_begin" value={summit.registration_begin} onChange={this.handleChange} />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="registration_finish">Registration Finish</label>
                            <input type="text" className="form-control" name="registration_finish" value={summit.registration_finish} onChange={this.handleChange} />
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
)(SummitDatesApp);
