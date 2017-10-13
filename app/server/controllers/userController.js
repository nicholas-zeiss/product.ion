/**
 *
 *  Here we set up a controller for our user model
 *
**/


const User = require('../models/user.js');

exports.makeUser = (data, cb) => {
	new User(data)
		.save()
		.then(cb);
};

exports.getUser = (username, cb) => {
	new User({ username })
		.fetch({ withRelated: [ 'org', 'projects' ] })
		.then(cb);
};

