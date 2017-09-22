import React from 'react';
import TableHeading from './TableHeading';
import TableCell from './TableCell';
import TableRow from './TableRow';
import './datatables.css';

const defaults = {
    sortFunc: (a,b) => (a < b ? -1 : (a > b ? 1 : 0)),
    sortable: true,
    sortCol: 0,
    sortDir: 1,
    colWidth: ''
}

const createRow = (row, columns) => {

	return columns.map((col,i) => {
		return (
		<TableCell key={i}>
            {row[col.columnKey]}
		</TableCell>
		);
	});
};

const getSortDir = (columnKey, columnIndex, sortCol, sortDir) => {
    if(columnKey && (columnKey === sortCol)) {
        return sortDir;
    }
    if(sortCol === columnIndex) {
        return sortDir;
    }
    return null
};

const Table = (props) => {
    let {options, columns, children} = props;

    return (
        <table className={props.className}>
            <thead>
                <tr>
			    {children.map((col,i) => {

                    let sortCol = (options.sortCol) ? options.sortCol : defaults.sortCol;
                    let sortDir = (options.sortDir) ? options.sortDir : defaults.sortDir;
                    let sortFunc = (col.sortFunc) ? col.sortFunc : defaults.sortFunc;
                    let sortable = (col.sortable) ? col.sortable : defaults.sortable;
                    let colWidth = (col.width) ? col.width : defaults.colWidth;

                    return (
                        <TableHeading
                            onSort={options.onSort}
                            sortDir={getSortDir(col.columnKey, i, sortCol, sortDir)}
                            sortable={sortable}
                            sortFunc={sortFunc}
                            columnIndex={i}
                            columnKey={col.columnKey}
                            width={colWidth}
                            key={i}
                        >
                            {col.value}
                        </TableHeading>
                    );
                })}
                </tr>
            </thead>
            <tbody>
                {children.length > 0 && props.data.map((row,i) => {
                    if(Array.isArray(row) && row.length !== children.length) {
                        console.warn(`Data at row ${i} is ${row.length}. It should be ${children.length}.`);
                        return <tr />
                    }

                    return (
                        <TableRow even={i%2 === 0} key={i}>
                                    {createRow(row, children)}
                        </TableRow>
                    );
                })}
            </tbody>
        </table>
    );
};

