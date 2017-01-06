import React from 'react';
import { connect } from 'react-redux';
import { selectComponent } from '../../actions';
import ViewToggler from './ViewToggler';
import DocsView from './DocsView';
import CodeView from './CodeView';

class ComponentDetail extends React.Component {

	componentDidMount() {
		if(this.props.params.component) {
			this.props.selectComponent(this.props.params.component);
		}	
	}

	componentWillReceiveProps(nextProps) {
		if(this.props.params.component !== nextProps.params.component) {
			this.props.selectComponent(nextProps.params.component);
		}
	}

	render() {
		const { selected } = this.props;

		if(!selected) {
			return <span>Not found! {this.props.params.component}</span>
		}
		
		return (
			<div>
				<div className="row heading">
					<div className="col-md-8">
						<h2>{selected.name}</h2>
					</div>
					<div className="col-md-4 pull-right">
						<ViewToggler />
					</div>
				</div>
				<div className="row">
					<div className="col-lg-12">
						<DocsView key={`docs-${selected.name}`} />
						<CodeView key={`code-${selected.name}`} />
					</div>
				</div>
			</div>
		);
	}
}

export default connect(
	(state) => ({
		selected: state.selectedComponent
	}),

	(dispatch) => ({
		selectComponent(component) {
			dispatch(selectComponent(component));
		}
	}) 
)(ComponentDetail);