import React from 'react';

class EditableTableColumn extends React.Component {
	
	render () {
		throw new Error('<EditableTableColumn /> should never render');
	}
}

TableColumn.defaultProps = {
	cell: (data) => data
};

TableColumn.propTypes = {
	cell: React.PropTypes.func.isRequired,
    columnKey: React.PropTypes.any
}

export default EditableTableColumn;