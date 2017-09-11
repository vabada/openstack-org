import React from 'react';
import update from 'react/lib/update';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import SortableTableHeading from './SortableTableHeading';
import SortableTableCell from './SortableTableCell';
import SortableTableRow from './SortableTableRow';
import './datatables.css';

const defaults = {
    colWidth: ''
}

const createRow = (row, columns) => {

	return columns.map((col,i) => {
		return (
		<SortableTableCell key={i}>
            {row[col.columnKey]}
		</SortableTableCell>
		);
	});
};


class SortableTable extends React.Component {

    constructor(props) {
        super(props);
        this.moveRow = this.moveRow.bind(this);
        this.dropRow = this.dropRow.bind(this);

        this.state = {
            rows: props.data
        };
    }

    moveRow(dragIndex, hoverIndex) {
        const { rows } = this.state;
        const dragRow = rows[dragIndex];

        this.setState(update(this.state, {
            rows: {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, dragRow],
                ],
            },
        }));
    }

    dropRow() {
        this.props.dropCallback(this.state.rows);
    }

    render() {
        let {options, columns} = this.props;
        return (
        <table className={options.className}>
            <thead>
                <tr>
                {columns.map((col,i) => {

                    let colWidth = (col.width) ? col.width : defaults.colWidth;

                    return (
                    <SortableTableHeading
                        columnIndex={i}
                        columnKey={col.columnKey}
                        width={colWidth}
                        key={i}
                    >
                        {col.value}
                    </SortableTableHeading>
                    );
                })}
                </tr>
            </thead>
            <tbody>
            {columns.length > 0 && this.state.rows.map((row,i) => {
                if(Array.isArray(row) && row.length !== columns.length) {
                    console.warn(`Data at row ${i} is ${row.length}. It should be ${columns.length}.`);
                    return <tr />
                }
                return (
                    <SortableTableRow even={i%2 === 0} key={row.id} index={i} id={row.id} moveCard={this.moveRow} dropCard={this.dropRow}>
                        {createRow(row, columns)}
                    </SortableTableRow>
                );
            })}
            </tbody>
        </table>
        );
    }
};

export default DragDropContext(HTML5Backend)(SortableTable);