import React from 'react';
import dropdownStyles from './dropdown.module.scss';
import cx from 'classnames';
import nodeInRoot from '~core-utils/nodeInRoot';

/**
 * Dropdown is a simple dropdown menu that works almost exactly the same way as a `<select>`
 * tag, but looks way nicer.
 */
class Dropdown extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			opened: false
		};
		this.toggle = this.toggle.bind(this);
		this.checkOuterClick = this.checkOuterClick.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	componentDidMount () {
		document.body.addEventListener('click', this.checkOuterClick);
	}

	componentWillUnmount () {
		document.body.removeEventListener('click', this.checkOuterClick);
	}

	checkOuterClick (e) {
		if(!nodeInRoot(e.target, ReactDOM.findDOMNode(this))) {
			this.setState({opened: false});
		}
	}

	toggle(e) {
		e.preventDefault();
		this.setState({
			opened: !this.state.opened
		});
	}

	handleChange (selection) {
		const { onChange } = this.props;
		onChange && onChange(selection);
		this.setState({opened: false});
	}

	render() {
		const { children, value } = this.props;

		return (
			<div className={cx({dropdown: true, open: this.state.opened})}>
				<button onClick={this.toggle} className="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown">
					{value}
					<span className="caret" />
				</button>
				{this.state.opened &&
					<ul className="dropdown-menu">
						{React.Children.map(children, child => (
							React.cloneElement(
								child,
								{
									...child.props,
									onChange: this.handleChange
								},
								child.props.children
							)
						))}
					</ul>
				}
			</div>		
		);
	}
}

Dropdown.propTypes = {	
	/**
	 * The current value of the dropdown. Displayed in the box when unopened.	 
	 */
	value: React.PropTypes.string,
	/**
	 * Handler that is fired when the dropdown value changes. It is passed the
	 * child's `eventKey` as an argument.	 
	 */
	onChange: React.PropTypes.func
};

export default Dropdown;
