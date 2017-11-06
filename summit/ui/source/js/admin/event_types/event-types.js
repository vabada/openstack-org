import React from 'react';
import { connect } from 'react-redux';
import { AjaxLoader } from '~core-components/ajaxloader';
import Message from "~core-components/message";
import DataTable from '~core-components/table/DataTable';
import { fetchAll, editEventType, deleteEventType, seedDefault } from './actions';

class EventTypesApp extends React.Component
{
    constructor(props) {
        super(props);

        this.handleAddNew = this.handleAddNew.bind(this);
        this.handleSeedDefaults = this.handleSeedDefaults.bind(this);

        this.state = {
            add_event_type: 'presentation'
        }
    }

    componentDidMount () {
        if(!this.props.items.length) {
            this.props.fetchAll();
        }
    }

    handleAddNew(ev) {
        ev.preventDefault();
        this.props.addNewEventType(this.state.add_event_type);
    }

    handleChangeType(ev) {
        this.setState(
            add_event_type: ev.target.value
        )
    }

    handleSeedDefaults(event) {
        event.preventDefault();
        this.props.seedDefaultEventTypes();
    }

    render() {

        let columns = [
            { columnKey: 'type', value: 'Type' }
        ];

        let table_options = {
            className: "table table-striped table-bordered table-hover dataTable",
            actions: {
                edit: this.props.editRow,
                delete: this.props.deleteRow
            }
        }

        return (
            <div>
                <Message />
                <AjaxLoader show={this.props.loading} />
                <div className="row">
                    <div className="col-md-4 form-inline">
                        <select className="form-control" onChange={(e) => this.handleChangeType(e)}>
                            <option value="presentation"> Presentation Type </option>
                            <option value="event"> Event Type </option>
                        </select>
                        <button className="btn btn-primary" onClick={this.handleAddNew}> Add New </button>
                    </div>
                    <div className="col-md-4">
                        <button className="btn btn-primary" onClick={this.handleSeedDefaults}> Seed Defaults </button>
                    </div>
                </div>
                {this.props.items.length > 0 &&
                    <DataTable
                        options={table_options}
                        data={this.props.items}
                        columns={columns}
                    />
                }
            </div>
        );
    }
}

export default connect (
    state => {
        return {
            loading: state.loading,
            msg: state.msg,
            msg_type: state.msg_type,
            items: state.items
        }
    },
    dispatch => ({
        fetchAll () {
            dispatch(fetchAll());
        },
        editRow(id) {
            dispatch(editEventType({id}));
        },
        deleteRow(id) {
            dispatch(deleteEventType({id}));
        },
        addNewEventType(type) {
            dispatch(editEventType({id: type}));
        },
        seedDefaultEventTypes() {
            dispatch(seedDefault({id: 0}));
        }
    })
)(EventTypesApp);
