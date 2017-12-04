//require('es6-promise').polyfill();
import ReactDOM from 'react-dom';
import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import Documents from './components/Documents.jsx';
import Twitter from './components/Twitter.jsx';
import Facebook from './components/Facebook.jsx';
import Instagram from './components/Instagram.jsx';
import path from 'path';
import Login from './components/Login.jsx';
import Welcome from './components/Welcome.jsx';
import Signup from './components/Signup.jsx';


// Note: '/' gets redirected to '/app'
const renderApp = () => {
  ReactDOM.render(
	<div>
		<BrowserRouter>
		  <div>
			<Route exact path='/app' component={Welcome} />
			<Route exact path='/app/login' component={Login} />
			<Route exact path='/app/signup' component={Signup} />
			<Route exact path='/app/documents' component={Documents} />
			<Route exact path='/app/twitter' component={Twitter} />
			<Route exact path='/app/facebook' component={Facebook} />
			<Route exact path='/app/instagram' component={Instagram} />
		  </div>
		</BrowserRouter>
	</div>,
	document.getElementById('root'));
};


renderApp();

if (module.hot) {
  module.hot.accept();
}

