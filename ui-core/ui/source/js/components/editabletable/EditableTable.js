import React from 'react';
import update from 'react/lib/update';
import EditableTableHeading from './EditableTableHeading';
import EditableTableCell from './EditableTableCell';
import EditableActionsTableCell from './EditableActionsTableCell';
import EditableTableRow from './EditableTableRow';
import './datatables.css';

const defaults = {
    colWidth: ''
}

const createRow = (row, columns, actions) => {

    var action_buttons = '';
    var cells = columns.map((col,i) => {
        return (
            <EditableTableCell key={i} is_edit={row.is_edit}>
                {row[col.columnKey]}
            </EditableTableCell>
        );
    });

    if (actions) {
        cells.push(<EditableActionsTableCell key='actions' id={row['id']} actions={actions}/>);
    }

    return cells;
};

const createNewRow = (row, columns, addNew) => {

    var cells = columns.map((col,i) => {
        return (
            <td key={i}>
                <input id={ 'new_' + col.columnKey } />
            </td>
        );
    });

    cells.push(
        <td>
            <button className="btn btn-default" onClick={addNew}> Add </button>
        </td>
    );

    return cells;
};


export default class EditableTable extends React.Component {

    constructor(props) {
        super(props);
        props.options.actions.edit = this.editRow.bind(this);
        props.options.actions.cancel = this.editRowCancel.bind(this);

        this.state = {
            rows: props.data
        };
    }

    componentWillReceiveProps(nextProps) {
        // You don't have to do this check first, but it can help prevent an unneeded render
        if (nextProps.data.length !== this.state.rows.length) {
            this.setState({ rows: nextProps.data });
        }
    }

    editRow(id, ev) {
        const { rows } = this.state;
        let row = rows.find(r => r.id = id);
        row.is_edit = true;

        this.setState(update(this.state, {
            rows: rows
        }));
    }

    editRowCancel(id, ev) {
        const { rows } = this.state;
        rows.forEach(r => {
            r.is_edit = false;
        });

        this.setState(update(this.state, {
            rows: rows
        }));
    }

    render() {
        let {options, columns, addNewRow, saveRow, deleteRow } = this.props;
        return (
            <table className={options.className}>
                <thead>
                    <tr>
                        {columns.map((col,i) => {
                            let colWidth = (col.width) ? col.width : defaults.colWidth;
                            return (
                                <EditableTableHeading width={colWidth} key={i} >
                                    {col.value}
                                </EditableTableHeading>
                            );
                        })}
                        {options.actions &&
                            <EditableTableHeading key='actions' >
                                Actions
                            </EditableTableHeading>
                        }
                    </tr>
                </thead>
                <tbody>
                    {columns.length > 0 && this.state.rows.map((row,i) => {
                        if(Array.isArray(row) && row.length !== columns.length) {
                            console.warn(`Data at row ${i} is ${row.length}. It should be ${columns.length}.`);
                            return <tr />
                        }
                        return (
                            <EditableTableRow even={i%2 === 0} key={row.id} id={row.id} >
                                {createRow(row, columns, options.actions)}
                            </EditableTableRow>

                        );
                    })}
                    <EditableTableRow even={i%2 === 0} id='new_row' >
                        {createNewRow(row, columns, addNewRow)}
                    </EditableTableRow>
                </tbody>
            </table>
        );
    }
};
