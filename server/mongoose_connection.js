"use strict";
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

if(process.env.MONGO_HOST) {
	const auth_string = process.env.APP_DB_USER+':'+process.env.APP_DB_PASS;
	const host_string = process.env.MONGO_HOST+':'+process.env.MONGO_PORT;
	const mongo_connect_url = (
		'mongodb://'+auth_string+'@'+host_string+'/'+process.env.DB_NAME
	);
	console.log(mongo_connect_url);
	const mongoose_options = {server: {socketOptions: {
      socketTimeoutMS: 10000,
      connectTimeoutMS: 10000
	}}};
	mongoose.connect(mongo_connect_url, mongoose_options);
}

module.exports = mongoose;
