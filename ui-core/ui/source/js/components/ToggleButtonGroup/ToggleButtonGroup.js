import React from 'react';
import './toggle-buttons.module.scss';

/**
 * Toggle buttons work like radio buttons. You can choose one option from a horizontally
 * displayed list of buttons, and it shows selected state.
 */
const ToggleButtonGroup = ({ children, selectedKey, onChange }) => (
	<div className="btn-group" data-toggle="buttons">
		{React.Children.map(children, (child) => (
			React.cloneElement(
				child,
				{
					...child.props,
					onChange,
					active: child.props.eventKey === selectedKey
				},
				child.props.children
			)
		))}
	</div>	
);

ToggleButtonGroup.propTypes = {
	/**
	 * The event that is fired on toggle. Receives the selected `eventKey` as the first parameter.	 
	 */
	onChange: React.PropTypes.func,
	/**
	 * The `eventKey` of the child that is currently selected	 
	 */
	selectedKey: React.PropTypes.any
};

export default ToggleButtonGroup;