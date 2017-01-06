import { Dropdown, DropdownItem } from '~core-components/Dropdown';

const options = [
	{code: "US", title: "United States"},
	{code: "AR", title: "Argentina"},
	{code: "NZ", title: "New Zealand"},
	{code: "AU", title: "Australia"}	
];

class MyDropdown extends React.Component {

	constructor (props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.state = {
			selection: null
		};
	}

	handleChange (selection) {
		this.setState({selection});		
	}

	render () {
		const {selection} = this.state;
		const option = options.find(o => o.code === selection);
		const val = option ? option.title : '-- Please select --';
		const children = options.map(o => (
			<DropdownItem key={o.code} eventKey={o.code}>{o.title}</DropdownItem>
		));
		children.splice(2, 0, <DropdownItem key='divider' eventKey='divider' divider />);

		return (
			<Dropdown onChange={this.handleChange} value={val}>
				{children}
			</Dropdown>
		);
	}
}

return <MyDropdown />;