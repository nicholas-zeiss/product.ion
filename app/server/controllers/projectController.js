/**
 *
 *  Here we set up a controller for our project model
 *
**/


const Project = require('../models/project.js');


exports.getProject = (id, success, error) => {
	new Project({ id })
		.fetch({ withRelated: [ 'budgets', 'expenses' ] })
		.then(success)
		.catch(error);
};


exports.getProjects = (IDs, success, error) => {
	Project
		.where('id', 'in', IDs)
		.fetchAll({ withRelated: [ 'budgets', 'expenses' ] })
		.then(success)
		.catch(error);
};


exports.makeProject = (data, cb) => {
	new Project(data)
		.save()
		.then(cb);
};


exports.updateProject = (project, success, error) => {
	new Project({ id: project.id })
		.save(project, { patch: true })
		.then(success)
		.catch(error);
};

