import React from 'react';
import { connect } from 'react-redux';
import { AjaxLoader } from '~core-components/ajaxloader';
import Message from "~core-components/message";
import SortableTable from '~core-components/sortabletable/SortableTable';
import { fetchAll } from './actions';

class SponsorsPackagesApp extends React.Component
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
            { columnKey: 'title', value: 'Title' },
            { columnKey: 'cost', value: 'Cost' },
            { columnKey: 'max_available', value: 'Max Available' },
            { columnKey: 'available', value: 'Currently Available' }
        ];

        let table_options = {
            className: "table table-striped table-bordered table-hover dataTable",
        }

        return (
            <div>
                <Message />
                <AjaxLoader show={this.props.loading} />
                {this.props.items.length &&
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
            console.log('row dropped');
        }
    })
)(SponsorsPackagesApp);
