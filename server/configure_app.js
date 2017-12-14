"use strict";
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mustacheExpress = require('mustache-express');
const logger = require('express-logger');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const inspect = require('util-inspect');

let configs = {'APP_ROOT': '/app/client-build'};

function configure_app() {

	// Create the app
	const app = express();

	// Add template parsing
	setup_template_parsing(app, 'html', configs['APP_ROOT']);

	// Add most of the other middleware
	setup_most_middleware(app);

	// Add Additional middleware for development server
	if(process.env.NODE_ENV == 'development') {
		add_dev_middleware(app);
	}

	return app;
}

module.exports = configure_app;


///   HELPERS   ///


function setup_template_parsing(app, template_extension, views_dir) {
	app.engine(template_extension, mustacheExpress());
	app.set('view engine', template_extension);
	app.set('views', views_dir);
}

function setup_most_middleware(app) {

	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({extended: true}))
	app.use(logger({ path: "log/express.log"}));
	app.use(cookieParser('very secret'));
	app.use(session({
	   	resave: false,
	   	saveUninitialized: true,
		secret: "very secret",
		cookie: {'secure': false}
	}));
	app.use(function(req, res, next) {
	  res.locals.session = req.session;
	  next();
	});
}

function add_dev_middleware(app) {
	const webpack = require('webpack')
	const config = require('../webpack.config.js')
	const compiler = webpack(config)

	var webpackDevMiddleware = require("webpack-dev-middleware");
	var webpackHotMiddleware = require("webpack-hot-middleware");

	app.use(webpackDevMiddleware(compiler, {
	  hot: true,
	  filename: 'bundle.js',
	  publicPath: '/hot',
	  stats: {
		colors: true,
	  },
	  historyApiFallback: true,
	}));

	app.use(webpackHotMiddleware(compiler, {
	  log: console.log,
	  path: '/__webpack_hmr',
	  heartbeat: 10 * 1000,
	}));
}

