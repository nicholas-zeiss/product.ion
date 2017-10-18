/**
 *
 *	Helper functions for our endpoints
 *
**/


const Project = require('./controllers/projectController');


//returns a string of the current date in YYYY-MM-DD format
//for the lastEdited property of projects
const dateString = () => {
	let now = new Date();
	
	let mm = ('0' + now.getMonth()).slice(-2);
	let dd = ('0' + now.getDate()).slice(-2);

	return [ now.getFullYear(), mm, dd ].join('-');
};


//when budgets/expenses are created/deleted/updated, we update the reqBudget/costToDate property of the associated project
//using this function, which then completes the http response optionally sending the modified collection of budgets/expenses
//attached to the project
const updateProject = (projID, type, res, sendCollection) => {
	Project.getProject(
		projID,
		project => {

			let newCost = type == 'budgets' ? 'reqBudget' : 'costToDate';

			let projectUpdate = {
				id: project.get('id'),
				lastEdited: dateString(),
				[newCost]: project
					.related(type)
					.reduce((cost, budgExp) => cost + budgExp.cost, 0)
			};

			Project.updateProject(
				projectUpdate,
				project => {

					if (sendCollection) {
						res.status(200).json(project.related(type));
					} else {
						res.sendStatus(200);
					}
				
				},
				error => res.sendStatus(500)
			);
		
		},
		error => res.sendStatus(500)
	);
};


module.exports = {
	dateString,
	updateProject
};

