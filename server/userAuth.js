"use strict";

const User = require('./models/User.js');

// This function produces a middleware checking that the user has been
// authenticated.  Note that this function is not itself middleware, but needs
// to be called to yield a middleware.  When calling it, optionally provide
// `success` and `failure` callbacks.
const isLoggedIn = function(success, failure) {

	// Defaults in case the `success` or `failure` callbacks are not defined.
	success = success || function(req,res,next){next()};
	failure = failure || function(req,res,next){res.send(403,'Forbidden')};

	// This is the actual middleware function, with the `success` and `failure`
	// callbacks bound.
	return function(req, res, next) {
		if(req.session.user) {
			success(req, res, next);
		} else {
			failure(req, res, next);
		}
	};
}

const login = function() {}

module.exports.isLoggedIn = isLoggedIn;
module.exports.login = login;
