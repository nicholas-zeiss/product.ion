/**
 *
 *  Here we set up a controller for our organization model
 *
**/


const Organization = require('../models/organization.js');


exports.getOrganization = (id, cb) => {
	new Organization({ id })
		.fetch({ withRelated: [ 'users', 'projects' ] })
		.then(cb);
};


exports.makeOrganization = (data, cb) => {
	new Organization(data)
		.save()
		.then(cb);
};

