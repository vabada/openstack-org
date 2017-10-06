import React from 'react';
import { connect } from 'react-redux';
import { AjaxLoader } from '~core-components/ajaxloader';
import Message from "~core-components/message";
import { Table } from '~core-components/table/index.js';
import { fetchAll, editEventType, deleteEventType, seedDefault } from './actions';

class EventTypesApp extends React.Component
{
    constructor(props) {
        super(props);

        this.handleAddNew = this.handleAddNew.bind(this);
        this.handleSeedDefaults = this.handleSeedDefaults.bind(this);
    }

    componentDidMount () {
        if(!this.props.items.length) {
            this.props.fetchAll();
        }
    }

    handleAddNew(event) {
        event.preventDefault();
        this.props.addNewEventType();
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
                    <div className="col-md-4">
                        <button className="btn btn-primary" onClick={this.handleAddNew}> Add New </button>
                    </div>
                    <div className="col-md-4">
                        <button className="btn btn-primary" onClick={this.handleSeedDefaults}> Seed Defaults </button>
                    </div>
                </div>
                {this.props.items.length > 0 &&
                    <Table
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
        addNewEventType() {
            dispatch(editEventType({id: 0}));
        },
        seedDefaultEventTypes() {
            dispatch(seedDefault({id: 0}));
        }
    })
)(EventTypesApp);
