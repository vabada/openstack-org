import React from 'react';
import { connect } from 'react-redux';
import CodePreview from '../ui/CodePreview';
import CodeMirrorEditor from '../ui/CodeMirrorEditor';
import { updateEditor } from '../../actions';
import '../../../less/codemirror-theme.less';

class CodeView extends React.Component {

	render() {
		const { active, handleCodeChange, selected } = this.props;

		if(!this.props.active) return null;

		return (
			<div>
				<div className="staging-area">
					<CodePreview code={selected.sandbox} />				
				</div>
				<CodeMirrorEditor
					key={selected.name}
					onChange={handleCodeChange}
					codeText={selected.sandbox} />	
			</div>
		);

	}
}
export default connect(
	state => ({
		selected: state.selectedComponent,
		active: state.view === 'code'
	}),
	dispatch => ({
		handleCodeChange(code) {
			dispatch(updateEditor(code));
		}
	})
)(CodeView);