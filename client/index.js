//require('es6-promise').polyfill();
import ReactDOM from 'react-dom';
import React from 'react';
import {BrowserRouter, Route, IndexRoute} from 'react-router-dom';
import Documents from './components/Documents.jsx';
import Twitter from './components/Twitter.jsx';
import Facebook from './components/Facebook.jsx';
import Instagram from './components/Instagram.jsx';
import path from 'path';
import Login from './components/Login.jsx';
import Welcome from './components/Welcome.jsx';
import Signup from './components/Signup.jsx';
import App from './components/App.jsx';


// Setup redux and saga
import "regenerator-runtime/runtime";
import { Provider } from 'react-redux';
import {createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas/index';
import rootReducer from './reducers';
const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga)


// Note: '/' gets redirected to '/app'
const renderApp = () => {
  ReactDOM.render(
	  <Provider store={store}>
		<BrowserRouter>
			<App>
				<Route exact path='/app/login' component={Login} />
				<Route exact path='/app/signup' component={Signup} />
				<Route exact path='/app/documents' component={Documents} />
				<Route exact path='/app/twitter' component={Twitter} />
				<Route exact path='/app/facebook' component={Facebook} />
				<Route exact path='/app/instagram' component={Instagram} />
			</App>
		</BrowserRouter>
	  </Provider>,
	document.getElementById('root'));
};


renderApp();

if (module.hot) {
  module.hot.accept();
}

