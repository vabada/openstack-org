import React from 'react';
import { connect } from 'react-redux';
import { AjaxLoader } from '~core-components/ajaxloader';
import Message from "~core-components/message";
import SortableTable from '~core-components/sortabletable/SortableTable';
import { fetchAll, postOrder, editAddOn, deleteAddOn } from './actions';

class SponsorsAddOnsApp extends React.Component
{
    constructor(props) {
        super(props);

        this.handleAddNew = this.handleAddNew.bind(this);
    }

    componentDidMount () {
        if(!this.props.items.length) {
            this.props.fetchAll();
        }
    }

    handleAddNew(event) {
        event.preventDefault();
        this.props.addNewAddOn();
    }

    render() {

        let columns = [
            { columnKey: 'title', value: 'Title' },
            { columnKey: 'cost', value: 'Cost' },
            { columnKey: 'max_available', value: 'Max Available' },
            { columnKey: 'available', value: 'Currently Available' }
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
                    <div className="col-md-12">
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
            dispatch(editAddOn({id}));
        },
        deleteRow(id) {
            dispatch(deleteAddOn({id}));
        },
        addNewAddOn() {
            dispatch(editAddOn({id: 0}));
        },
    })
)(SponsorsAddOnsApp);
