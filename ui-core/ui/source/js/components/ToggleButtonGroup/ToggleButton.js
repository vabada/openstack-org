import React from 'react';
import cx from 'classnames';

class ToggleButton extends React.Component {

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
		const {active, children} = this.props;
		const classes = cx({
			'btn btn-default': true,
			active
		});

		return (
			<label className={classes}>
				<input type="radio" checked={active} onChange={this.handleChange} /> {children}
			</label>
		);
	}
}

ToggleButton.propTypes = {
	/**
	 * If true, the button is in an active state.	 
	 */
	active: React.PropTypes.bool,
	/**
	 * A unique identifier for this child. Passed to the parent component on selection.
	 */
	eventKey: React.PropTypes.any.isRequired
};

export default ToggleButton;