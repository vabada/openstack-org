import React from 'react';
import { connect } from 'react-redux';
import { updateView } from '../../actions';
import {ToggleButtonGroup, ToggleButton} from '~core-components/ToggleButtonGroup';

class ViewToggler extends React.Component {

	render () {
		const { activeKey, onChange } = this.props;

		return (
			<div className="view-toggler">
				<ToggleButtonGroup selectedKey={activeKey} onChange={onChange}>
					<ToggleButton eventKey='docs'><i className="fa fa-question-circle" /> Docs</ToggleButton>
					<ToggleButton eventKey='code'><i className="fa fa-code" /> Code</ToggleButton>
				</ToggleButtonGroup>
			</div>

		);

	}
}

export default connect(
	(state) => ({
		activeKey: state.view
	}),

	(dispatch) => ({
		onChange(key) {
			dispatch(updateView(key));
		}
	})
)(ViewToggler);	