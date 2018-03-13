"use strict";

const User = require('./models/User.js');
const config = require('../appConstants.js');

// This function produces a middleware checking that the user has been
// authenticated.  Note that this function is not itself middleware, but needs
// to be called to yield a middleware.  When calling it, optionally provide
// `success` and `failure` callbacks.
const isLoggedIn = function(success, failure) {

	// Defaults in case the `success` or `failure` callbacks are not defined.
	success = success || function(req,res,next){next()};
	failure = failure || function(req,res,next){
		res.status(403).send('Forbidden')
	};

	// If authentication enforcement is switched off, all requests are passed
	// through as if authenticated.
	if(config.bypassAuthentication) {
		console.log('yo');
		return function(req, res, next){next();};
	}
	
	// This is the actual middleware function, with the `success` and `failure`
	// callbacks bound.
	return function(req, res, next) {
		console.log('Checking if logged in...');
		console.log(req.session.Auth);
		if(req.session.Auth) {
			console.log('OK, logged in!')
			success(req, res, next);
		} else {
			console.log('Not logged in!')
			failure(req, res, next);
		}
	};
}

const login = function() {}

module.exports.isLoggedIn = isLoggedIn;
module.exports.login = login;
