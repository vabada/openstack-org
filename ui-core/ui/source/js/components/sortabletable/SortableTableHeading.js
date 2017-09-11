import React from 'react';

class SortableTableHeading extends React.Component {

	constructor (props) {
		super(props);
	}

	render () {
		return (
			<th width={this.props.width}>
				{this.props.children}
			</th>
		);	
	}
	
}

SortableTableHeading.propTypes = {
	columnIndex: React.PropTypes.number,
	columnKey: React.PropTypes.any,
};

export default SortableTableHeading;