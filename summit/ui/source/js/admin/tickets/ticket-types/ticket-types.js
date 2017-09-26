import React from 'react';
import { connect } from 'react-redux';
import { AjaxLoader } from '~core-components/ajaxloader';
import Message from "~core-components/message";
import EditableTable from '~core-components/editabletable/EditableTable';
import { fetchAll, saveTicketType, deleteTicketType } from './actions';

class TicketTypesApp extends React.Component
{
    constructor(props) {
        super(props);
    }

    componentDidMount () {
        if(!this.props.items.length) {
            this.props.fetchAll();
        }
    }

    render() {

        let columns = [
            { columnKey: 'external_id', value: 'External ID' },
            { columnKey: 'name', value: 'Name' }
        ];

        let table_options = {
            className: "table table-striped table-bordered table-hover dataTable",
            actions: {
                save: this.props.saveRow,
                delete: this.props.deleteRow
            }
        }

        return (
            <div>
                <Message />
                <AjaxLoader show={this.props.loading} />
                {this.props.items.length &&
                    <EditableTable
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
        saveRow(row) {
            if (row.name && row.external_id) {
                dispatch(saveTicketType({ticket_type: row}));
            }
        },
        deleteRow(id) {
            dispatch(deleteTicketType({id}));
        },
    })
)(TicketTypesApp);
