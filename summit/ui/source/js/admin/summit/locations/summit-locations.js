import React from 'react';
import { connect } from 'react-redux';
import { AjaxLoader } from '~core-components/ajaxloader';
import Message from "~core-components/message";
import SortableTable from '~core-components/sortabletable/SortableTable';
import { fetchAll, postOrder, editItem, deleteItem } from './actions';

class SummitLocationsApp extends React.Component
{
    constructor(props) {
        super(props);

        this.state = {
            add_location_type: 'venue'
        }

        this.handleAddNew = this.handleAddNew.bind(this);
    }

    componentDidMount () {
        if(!this.props.items.length) {
            this.props.fetchAll();
        }
    }

    handleChangeType(ev) {
        this.setState(
            add_location_type: ev.target.value
        );
    }

    handleAddNew(event) {
        event.preventDefault();
        this.props.addNewRow(this.state.add_location_type);
    }

    render() {

        let columns = [
            { columnKey: 'name', value: 'Name' },
            { columnKey: 'classname', value: 'Class Name' }
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
                    <div className="col-md-6 form-inline">
                        <select className="form-control" onChange={(e) => this.handleChangeType(e)}>
                            <option value="venue"> Venue </option>
                            <option value="hotel"> Hotel </option>
                            <option value="airport"> Airport </option>
                            <option value="external"> External Location </option>
                        </select>
                        <button className="btn btn-primary" onClick={this.handleAddNew}> Add New </button>
                    </div>
                </div>
                {this.props.items.length > 0 &&
                    <SortableTable
                        options={table_options}
                        data={this.props.items}
                        columns={columns}
                        dropCallback={this.props.setNewOrder}
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
        setNewOrder(rows) {
            let ids = rows.map(p => p.id).join(',');
            dispatch(postOrder({ids}));
        },
        editRow(id) {
            dispatch(editItem({id}));
        },
        deleteRow(id) {
            dispatch(deleteItem({id}));
        },
        addNewRow(type) {
            dispatch(editItem({id: type}));
        },
    })
)(SummitLocationsApp);
