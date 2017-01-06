import React from 'react';
import ReactDOM from 'react-dom';

class ScrollableNav extends React.Component {

	constructor (props) {
		super(props);
		this.state = {
			height: null
		};

		this.init = this.init.bind(this);
	}

	componentDidMount () {
		window.addEventListener('resize', this.init)
	}

	componentWillUnmount () {
		window.removeEventListener('resize', this.init);
	}

	init () {
		const node = ReactDOM.findDOMNode(this);
		const offset = node.getBoundingClientRect().top;
		const windowHeight = window.innerHeight;

		this.setState({
			height: windowHeight-offset
		});
	}

	render() {
		const style = {
			visibility: this.state.height ? 'visible' : 'hidden',
			overflowY: 'auto',
			height: this.state.height
		}

		return (
			<ul ref={() => {
				if(this.state.height === null) {
					this.init()
				}
			}} className="nav nav-pills nav-stacked" style={style}>
		  		{this.props.children}
			</ul>

		)
	}
}

export default ScrollableNav;