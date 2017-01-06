import React from 'react';
import { connect } from 'react-redux';
import MANIFEST from '../lib/__manifest.json';
import { initComponents } from '../actions';
import { Match } from 'react-router';
import * as CoreComponents from '../lib/ui-core';
import ComponentDetail from './containers/ComponentDetail';
import ComponentList from './containers/ComponentList';

class StyleGuide extends React.Component {

	constructor (props) {
		super(props);

		this._expose(CoreComponents);

		this.props.initComponents(MANIFEST);
	}

	_expose(components) {
		for(let c in components) {
			if(typeof components[c] === 'function') {
				// expose to browser global for code editor				
				window[c] = components[c];
			} else if(typeof components[c] === 'object') {
				this._expose(components[c]);
			}
		}
	}

	render() {	
		const {pathname} = this.props;	
		return (
		<div className="row">
			<div className="col-md-3 col-xs-12 component-list">
				<ComponentList />
			</div>
			<div className="col-md-9 col-xs-12 component-detail">
				<Match pattern=':component' component={ComponentDetail} />
				<Match exactly pattern={pathname} render={() => (
					<h3>Please select a component</h3>
				)} />				
			</div>
		</div>
		);
	}
}

export default connect(
	null, 
	(dispatch) => ({
		initComponents(data) {
			dispatch(initComponents(data));
		}
	}) 
)(StyleGuide);