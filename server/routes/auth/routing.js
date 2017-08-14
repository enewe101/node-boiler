const express = require('express');
const twitterRouter = require('./twitter.js');
const facebookRouter = require('./facebook.js');
const instagramRouter = require('./instagram.js');
const localAuthRouter = require('./local.js');

// Build and export the router.
function prepare_router() {
  const router = express.Router();
  router.use('/local', localAuthRouter);
  router.use('/twitter', twitterRouter);
  router.use('/facebook', facebookRouter);
  router.use('/instagram', instagramRouter);
  module.exports = router;
}

prepare_router();
