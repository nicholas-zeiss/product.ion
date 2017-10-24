/**
 *
 *	Helper functions for our endpoints
 *
**/



const jwt = require('jsonwebtoken');

const Project = require('./controllers/projectController');


// returns a string of the current date in YYYY-MM-DD format
// for the lastEdited property of projects
const dateString = () => {
	let now = new Date();
	
	let mm = ('0' + (now.getMonth() + 1)).slice(-2);
	let dd = ('0' + now.getDate()).slice(-2);

	return [ now.getFullYear(), mm, dd ].join('-');
};


// generates a JWT for verification
const generateToken = user => {
	user = {
		username: user.get('username'),
		id: user.get('id')
	};

	return jwt.sign(user, 'SSSHHHitsaSECRET', { expiresIn: '12h' });
};


// given an organization model, return an array of the attached users stripped of passwords
const getUsers = org => (
	org
		.related('users')
		.map(user => ({ 
			id: user.get('id'),
			permissions: user.get('permissions'),
			username: user.get('username')
		}))
);


// used when someone logs in, signs up, or reloads the page and has a valid auth token,
// this sends the base data needed by the app's homepage
const sendOrganizationInfo = (user, organization, res, token = generateToken(user)) => {
	res
		.status(200)
		.json({ 
			id: organization.get('id'),
			name: organization.get('name'),
			projects: organization.related('projects'),
			token: token,
			user: {
				id: user.get('id'),
				permissions: user.get('permissions'),
				projects: user
					.related('projects')
					.map(project => project.get('id')),
				username: user.get('username')
			},
			users: getUsers(organization)
		});
};


// when budgets/expenses are created/deleted/updated, we update the reqBudget/costToDate property of the associated project
// using this function, which then completes the http response optionally sending the modified collection of budgets/expenses
// attached to the project
const updateProject = (projID, type, res, sendCollection) => {
	Project.getProject(
		projID,
		project => {

			let newCost = type == 'budgets' ? 'reqBudget' : 'costToDate';
			let key = type == 'budgets' ? 'total' : 'cost';

			let projectUpdate = {
				id: project.get('id'),
				lastEdited: dateString(),
				[newCost]: project
					.related(type)
					.reduce((cost, budgExp) => cost + budgExp.get(key), 0)
			};


			Project.updateProject(
				projectUpdate,
				project => {

					if (sendCollection) {
						res.status(200).json(sendCollection);
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
	generateToken,
	getUsers,
	sendOrganizationInfo,
	updateProject
};

