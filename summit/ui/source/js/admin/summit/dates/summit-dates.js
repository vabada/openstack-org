import React from 'react';
import { connect } from 'react-redux';
import { saveSummitDates } from './actions';
import { AjaxLoader } from '~core-components/ajaxloader';
import Message from "~core-components/message";
import DateTimePicker from "~core-components/datetimepicker";

class SummitDatesApp extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {
            summit: props.summit,
            time_zones: props.time_zones,
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

    handleDateChange(name, value) {
        this.state.summit[name] = (typeof value == 'string') ? value : value.format('YYYY-MM-DD HH:mm:ss');
        this.setState({summit: this.state.summit});
    }

    isValidDate(compareDateBefore, compareDateAfter, selectedDate, currentDate) {
        currentDate = (typeof currentDate == 'string') ? moment(currentDate) : currentDate;
        if (compareDateBefore == '<')
            return (selectedDate < moment(compareDateAfter));
        else if(compareDateBefore == '>')
            return (selectedDate > moment(compareDateAfter));
        else
            return (selectedDate >= moment(compareDateBefore) && selectedDate <= moment(compareDateAfter));
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
                    <div className="row form-group form-inline">
                        <div className="col-md-6">
                            <label htmlFor="time_zone">Time Zone</label>
                            <select type="text" className="form-control" name="time_zone" value={summit.time_zone} onChange={this.handleChange} >
                                {Object.keys(time_zones).map(time_zone_id => (
                                    <option key={time_zone_id} value={time_zone_id}>
                                        {time_zones[time_zone_id]}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 form-group form-inline">
                            <label htmlFor="begin_date">Begin</label>
                            <DateTimePicker
                                onChange={this.handleDateChange.bind(this, 'begin_date')}
                                isValidDate={this.isValidDate.bind(this, '<', summit.finish_date)}
                                dateFormat="YYYY-MM-DD" timeFormat="HH:mm:ss" value={summit.begin_date}/>
                        </div>
                        <div className="col-md-6 form-group form-inline">
                            <label htmlFor="finish_date">Finish</label>
                            <DateTimePicker
                                onChange={this.handleDateChange.bind(this, 'finish_date')}
                                isValidDate={this.isValidDate.bind(this, '>', summit.begin_date)}
                                dateFormat="YYYY-MM-DD" timeFormat="HH:mm:ss" value={summit.finish_date}/>
                        </div>
                    </div>
                    <div className="row form-group form-inline">
                        <div className="col-md-6">
                            <label htmlFor="venues_date">Venues Show From</label>
                            <DateTimePicker
                                onChange={this.handleDateChange.bind(this, 'venues_date')}
                                isValidDate={this.isValidDate.bind(this, '<', summit.begin_date)}
                                dateFormat="YYYY-MM-DD" timeFormat="HH:mm:ss" value={summit.venues_date}/>
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="default_date">Default Start Date</label>
                            <DateTimePicker
                                onChange={this.handleDateChange.bind(this, 'default_date')}
                                isValidDate={this.isValidDate.bind(this, summit.begin_date, summit.finish_date)}
                                dateFormat="YYYY-MM-DD" timeFormat="HH:mm:ss" value={summit.default_date}/>
                        </div>
                    </div>
                    <div className="row form-group form-inline">
                        <div className="col-md-6">
                            <label htmlFor="submissions_begin">Submissions Begin</label>
                            <DateTimePicker
                                onChange={this.handleDateChange.bind(this, 'submissions_begin')}
                                isValidDate={this.isValidDate.bind(this, '<', summit.submissions_finish)}
                                dateFormat="YYYY-MM-DD" timeFormat="HH:mm:ss" value={summit.submissions_begin}/>
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="submissions_finish">Submissions Finish</label>
                            <DateTimePicker
                                onChange={this.handleDateChange.bind(this, 'submissions_finish')}
                                isValidDate={this.isValidDate.bind(this, '>', summit.submissions_begin)}
                                dateFormat="YYYY-MM-DD" timeFormat="HH:mm:ss" value={summit.submissions_finish}/>
                        </div>
                    </div>
                    <div className="row form-group form-inline">
                        <div className="col-md-6">
                            <label htmlFor="voting_begin">Voting Begin</label>
                            <DateTimePicker
                                onChange={this.handleDateChange.bind(this, 'voting_begin')}
                                isValidDate={this.isValidDate.bind(this, '<', summit.voting_finish)}
                                dateFormat="YYYY-MM-DD" timeFormat="HH:mm:ss" value={summit.voting_begin}/>
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="voting_finish">Voting Finish</label>
                            <DateTimePicker
                                onChange={this.handleDateChange.bind(this, 'voting_finish')}
                                isValidDate={this.isValidDate.bind(this, '>', summit.voting_begin)}
                                dateFormat="YYYY-MM-DD" timeFormat="HH:mm:ss" value={summit.voting_finish}/>
                        </div>
                    </div>
                    <div className="row form-group form-inline">
                        <div className="col-md-6">
                            <label htmlFor="selections_begin">Selections Begin</label>
                            <DateTimePicker
                                onChange={this.handleDateChange.bind(this, 'selections_begin')}
                                isValidDate={this.isValidDate.bind(this, '<', summit.selections_finish)}
                                dateFormat="YYYY-MM-DD" timeFormat="HH:mm:ss" value={summit.selections_begin}/>
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="selections_finish">Selections Finish</label>
                            <DateTimePicker
                                onChange={this.handleDateChange.bind(this, 'selections_finish')}
                                isValidDate={this.isValidDate.bind(this, '>', summit.selections_begin)}
                                dateFormat="YYYY-MM-DD" timeFormat="HH:mm:ss" value={summit.selections_finish}/>
                        </div>
                    </div>
                    <div className="row form-group form-inline">
                        <div className="col-md-6">
                            <label htmlFor="registration_begin">Registration Begin</label>
                            <DateTimePicker
                                onChange={this.handleDateChange.bind(this, 'registration_begin')}
                                isValidDate={this.isValidDate.bind(this, '<', summit.registration_finish)}
                                dateFormat="YYYY-MM-DD" timeFormat="HH:mm:ss" value={summit.registration_begin}/>
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="registration_finish">Registration Finish</label>
                            <DateTimePicker
                                onChange={this.handleDateChange.bind(this, 'registration_finish')}
                                isValidDate={this.isValidDate.bind(this, '>', summit.registration_begin)}
                                dateFormat="YYYY-MM-DD" timeFormat="HH:mm:ss" value={summit.registration_finish}/>
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
