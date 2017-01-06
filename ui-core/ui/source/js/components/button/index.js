import React from 'react';
import buttonStyles from './button.module.scss';
import cx from 'classnames';

/**
 * Buttons can be used for pretty much anything. You can link with them, you can add click handlers to them.
 * They come in all sorts of shapes and sizes. Pretty cool.
 */
const Button = ({
	active,
	disabled,
	children,
	onButtonClicked
}) => {

	return (
		<button onClick={onButtonClicked} className={cx({
			[buttonStyles.button]: true,
			[buttonStyles.disabled]: disabled,
			[buttonStyles.active]: active
		})}>{children}</button>
	);
};

Button.propTypes = {
	/**
	 * If true, show the button in an "active" state	 
	 */
	active: React.PropTypes.bool,
	/**
	 * If true, show the button in a "disabled" state	 
	 */
	disabled: React.PropTypes.bool,
	/**
	 * Handler that is fired on click of the button. Receives an Event object.	 
	 */
	onButtonClicked: React.PropTypes.func
};

export default Button;
