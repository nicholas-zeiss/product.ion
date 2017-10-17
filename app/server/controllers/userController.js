/**
 *
 *  Here we set up a controller for our user model
 *
**/


const User = require('../models/user.js');


exports.deleteUser = (id, success, error) => {
	new User({ id })
		.destroy()
		.then(success)
		.catch(error);
};


exports.getUser = (username, cb) => {
	new User({ username })
		.fetch({ withRelated: [ 'projects' ] })
		.then(cb);
};


exports.makeUser = (data, cb) => {
	new User(data)
		.save()
		.then(cb);
};


exports.updateUser = (id, data, success, error) => {
	new User({ id })
		.save(data, { patch: true })
		.then(success)
		.catch(error);
};

