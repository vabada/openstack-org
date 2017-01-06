import React from 'react';
import ReactDOM from 'react-dom';
import StyleGuide from './components/StyleGuide';
import {createStore, combineReduders} from 'redux';
import {Provider} from 'react-redux';
import reducer from './reducers/main';
import { BrowserRouter, Match } from 'react-router'

const store = createStore(reducer);

window.React = React;
window.ReactDOM = ReactDOM;

document.addEventListener("DOMContentLoaded", () => {
	ReactDOM.render(
		<Provider store={store}>
			<BrowserRouter>				
				<Match pattern='/style-guide' component={StyleGuide} />									
			</BrowserRouter>
		</Provider>, 
		document.getElementById('app')
	);
})