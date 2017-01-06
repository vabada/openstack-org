import Button from '~core-components/Button';

class MyButtonExample extends React.Component {

	render() {
		return (
			<div>
				<Button>Normal button</Button>
				<Button onButtonClicked={function() {alert('hello');}}>Click me</Button>
				<Button active={true}>Active button</Button>
				<Button disabled={true}>Disabled button</Button>
			</div>
		);		
	}
}

return <MyButtonExample />
