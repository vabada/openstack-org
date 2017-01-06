import React from 'react';
import cx from 'classnames';
import { Link } from 'react-router';

class NavItem extends React.Component {

	render() {
		const classes = cx({
			'nav-link': true,
			'active': this.props.active
		});

		return (
			<li className="nav-item">
				<Link activeClassName='active' to={this.props.link}>{this.props.children}</Link>
			</li>
  		);

	}
}

export default NavItem;