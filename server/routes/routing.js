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
  router.get('/app/*', serve_client_app);
  router.get('/app', function(req, res, next){
    res.redirect('/app/');
    next()
  });
  router.get('/', function(req, res, next){
    res.redirect('/app/');
    next()
  });

  module.exports = router;
}

function serve_client_app(req, res){
  console.log('SERVE CLIENT APP:' + req.originalUrl + ': ' + req.session.user);
  let GLOBALS = {
    'FACEBOOK_APP_ID': process.env.FACEBOOK_APP_ID
  };
  res.render('index', {'globals': JSON.stringify(GLOBALS)});
}

prepare_router();
