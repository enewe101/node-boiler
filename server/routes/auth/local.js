"use strict";
const express = require('express');
const request = require('request');
const User = require('../../models/User')

function prepare_router() {
  const router = express.Router();
  router.post('/login', processLoginAttempt);
  router.post('/signup', signup);
  module.exports = router;
}


function processLoginAttempt(req, res) {
  console.log(req.body);
  User.findOne({'email':req.body.email})
	.then(user => {
	  if(!user) {
	    res.json({'err':'bad-credentials', 'email':null});
      }
	  else if(user.checkPassword(req.body.password)) {
		// Successful authentication!  Put the user onto the session
		req.session.user = user;
        res.json({'err':null, 'email':user.email});

	  } else {
	    res.json({'err':'bad-credentials', 'email':null});
	  }
    })
    .catch(err => {
        console.log(err);
        res.status(500).send('error');
	})
}

function signup(req, res) {
  console.log(req.body);
  const user = new User({
	  'email': req.body.email
  });
  user.password = user.hash(req.body.password);
  user.save()
	.then(user => res.json({err:null}))
	.catch(err => {
		if(err.code == 11000) {
		  res.json({err:'dupe-email'});
		} else {
		  console.log(err); res.status(500).send('error')
		}
	});
}


prepare_router();

