import React from 'react';

const EditableTableCell = (props) => (
    if (props.is_edit) {
        <td {...props}>
            <input defaultValue={props.children} />
        </td>
    } else {
        <td {...props}>{props.children}</td>
    }

);

export default EditableTableCell;