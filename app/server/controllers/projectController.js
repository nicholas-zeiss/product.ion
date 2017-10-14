/**
 *
 *  Here we set up a controller for our project model
 *
**/


const Project = require('../models/project.js');


exports.getProject = (projID, cb) => {
	new Project({ projID })
		.fetch({ 
			withRelated: [
				'budgets',
				'org',
				'expenses',
				'users'
			]
		})
		.then(cb);
};

exports.makeProject = (data, cb) => {
	new Project(data)
		.save()
		.then(cb);
};

