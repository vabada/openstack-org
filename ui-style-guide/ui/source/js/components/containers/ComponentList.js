import React from 'react';
import { connect } from 'react-redux';
import ScrollableNav from '../ui/ScrollableNav';
import NavItem from '../ui/NavItem';

const ComponentList = (props) => {
	const {components} = props;

	return (
		<ScrollableNav>
			{components.map(c => <NavItem key={c.name} link={`/style-guide/${c.name}`}>{c.name}</NavItem>)}
		</ScrollableNav>
	);
};

export default connect(
	(state) => ({
		components: state.components
	})
)(ComponentList);