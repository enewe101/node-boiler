require('es6-promise').polyfill();
import ReactDOM from 'react-dom';
import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import App from './components/App.jsx';
import path from 'path';
import Login from './components/Login.jsx';
import Welcome from './components/Welcome.jsx';
import Signup from './components/Signup.jsx';


const renderApp = () => {
  ReactDOM.render(
	<div>
		<div>yo</div>
		<BrowserRouter>
		  <div>
			<Route exact path='/app/' component={Welcome} />
			<Route exact path='/app/dash' component={App} />
			<Route exact path='/app/login' component={Login} />
			<Route exact path='/app/signup' component={Signup} />
		  </div>
		</BrowserRouter>
	</div>,
	document.getElementById('root'));
};


renderApp();


if (module.hot) {
  module.hot.accept();
}
