import React from 'react';
import { connect } from 'react-redux';
import CodeMirrorEditor from '../ui/CodeMirrorEditor';
import { markdown } from 'markdown';
import PropsTable from './PropsTable';
import 'codemirror/theme/duotone-light.css';

class DocsView extends React.Component {

	render() {
		const { active, subcomponents, selected } = this.props;

		if(!this.props.active) return null;

		return (
			<div>
				{subcomponents.length > 1 &&
					<div className="alert alert-info">
						This component is a collection of subcomponents.
					</div>
				}
				<div className="doc-description">
					{subcomponents.map(s => (
						<div 
							key={s.name} 
							dangerouslySetInnerHTML={{
								__html: s.description ? markdown.toHTML(s.description) : null
							}}
						/>
					))}
				</div>
				<CodeMirrorEditor
					key={selected.name}
					readOnly={true}
					renderType='pre'
					theme='duotone-light'					
					codeText={selected.example} />	

				<h2>Properties</h2>
				{subcomponents.map(c => (
					<div key={c.name}>
						<h3>{c.name}</h3>
						<PropsTable props={c.props} />
					</div>
				))}							
			</div>
		);

	}
}
export default connect(
	state => ({
		selected: state.selectedComponent,
		subcomponents: state.selectedComponent ? state.selectedComponent.components : [],
		active: state.view === 'docs'
	}),
	dispatch => ({
		handleCodeChange(code) {
			dispatch(updateEditor(code));
		}
	})
)(DocsView);
