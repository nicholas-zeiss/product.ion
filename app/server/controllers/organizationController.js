/**
 *
 *  Here we set up a controller for our organization model
 *
**/


const Organization = require('../models/organization.js');


exports.getOrganization = (name, cb) => {
	new Organization({ name })
		.fetch({
			withRelated: [ 'users', 'projects' ] 
		})
		.then(cb);
};

exports.makeOrganization = (data, cb) => {
	new Organization(data)
		.save()
		.then(cb);
};

