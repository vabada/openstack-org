import React from 'react';

class DropdownItem extends React.Component {

	constructor (props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange (e) {
		e.preventDefault();		
		const { onChange, eventKey } = this.props;		
		onChange && onChange(eventKey);
	}

	render() {
		if(this.props.divider) {
			return (
				<li role="separator" className="divider" />
			);
		}

		return (
			<li><a href="#" onClick={this.handleChange}>{this.props.children}</a></li>
		);
	}
}

DropdownItem.propTypes = {
	/**
	 * If true, this item is a visual divider (not selectable).
	 */
	divider: React.PropTypes.bool,
	/**
	 * A unique identifier for this child. Passed to the parent component on selection.
	 */
	eventKey: React.PropTypes.any.isRequired
};

export default DropdownItem;

