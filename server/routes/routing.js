"use strict";
const oauth = require('oauth');
const request = require('request');
const authRouter = require('./auth/routing.js');
const express = require('express');
const isLoggedIn = require('../userAuth.js').isLoggedIn;


function prepare_router() {
  const router = express.Router();

  // Requests to paths starting with "/static" are handled by nginx
  // Requests to paths starting with "/.well-known" are also handled by nginx
  // 	and are used when obtaining a certificate, but not otherwise.

  // Authorization-related requests are handled by this route.
  // This includes local authorizations, and OAuth with providers like
  // Facebook, Instagram, etc.
  router.use('/auth', authRouter);

  // Any interaction with the api is handled by this route.
  router.use('/api', isLoggedIn(), require('./api/routing.js'));

  // All requests to `/app` cause the app to be delivered.  All path
  // information after
  // `/app/` is consumed by the client-side router.
  //router.get('/app', (req, res, next) => res.redirect('/app/'));
  router.get('/app/*', serve_client_app);

  module.exports = router;
}


function serve_client_app(req, res){
  let GLOBALS = {
    'FACEBOOK_APP_ID': process.env.FACEBOOK_APP_ID
  };
  res.render('index', {'globals': JSON.stringify(GLOBALS)});

//  if(req.session && req.session.user) {
//    // User is already signed in, no need to verify their credentials
//    res.send('Hi ' + req.session.user.name);
//
//  } else if (req.session && req.session.oauthAccessToken) {
//    twitterConsumer.get(
//      "https://api.twitter.com/1.1/account/verify_credentials.json",
//      req.session.oauthAccessToken,
//      req.session.oauthAccessTokenSecret,
//
//      function (error, data, response) {
//        if (error) {
//          //console.log(error)
//          res.redirect('/sessions/connect');
//        } else {
//          var parsedData = JSON.parse(data);
//          req.session.user = {'name':parsedData.screen_name};
//          res.send(
//            'You are signed in: '+parsedData.screen_name);
//            console.log('access token: ' + req.session.oauthAccessToken)
//            console.log('access token secret: ' 
//            + req.session.oauthAccessTokenSecret
//		  )
//        }
//      }
//
//    );
//
//  } else {
//    let GLOBALS = {
//      'FACEBOOK_APP_ID': process.env.FACEBOOK_APP_ID
//    };
//    res.render('index', {'globals': JSON.stringify(GLOBALS)});
//  }
}

prepare_router();
