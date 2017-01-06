import { ToggleButtonGroup, ToggleButton } from '~core-components/ToggleButtonGroup';

class MyToggler extends React.Component {

	constructor (props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.state = {
			currentView: 'list'
		};
	}

	handleChange (currentView) {
		this.setState({currentView});
	}

	render () {
		const {currentView} = this.state;
		return (
			<div>
				<h3>Now viewing {currentView}</h3>
				<ToggleButtonGroup selectedKey={currentView} onChange={this.handleChange}>
					<ToggleButton eventKey='grid'>Grid</ToggleButton>
					<ToggleButton eventKey='list'>List</ToggleButton>
				</ToggleButtonGroup>		
			</div>
		);
	}
}

return <MyToggler />;