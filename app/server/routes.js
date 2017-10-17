/**
 *
 *	Creates our API endpoints for interacting with the database
 *
 *	Welcome to callback hell, may your visit be short...
 *
**/


const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//import Bookshelf controllers
const Budget = require('./controllers/budgetController.js');
const Expense = require('./controllers/expenseController.js');
const Organization = require('./controllers/organizationController.js');
const Project = require('./controllers/projectController.js');
const User = require('./controllers/userController.js');




//------------------------------------------------------------------------------
//
//												AUTHORIZATION ENDPOINTS
//
//------------------------------------------------------------------------------

const authAPI = app => {

	//---------------------------------
	//	 					UTILS
	//---------------------------------

	//generates a JWT for verification
	const generateToken = user => {
		user = {
			username: user.get('username'),
			id: user.get('id')
		};

		return jwt.sign(user, 'SSSHHHitsaSECRET', { expiresIn: '12h' });
	};

	//given an organization model, return an array of the attached users stripped of passwords
	const getUsers = org => (
		org
			.related('users')
			.map(user => ({ 
				id: user.get('id'),
				permissions: user.get('permissions'),
				username: user.get('username')
			}))
	);

	//used when someone logs in, signs up, or reloads the page and has a valid auth token,
	//this sends the base data needed by the app's homepage
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



	//---------------------------------
	//	 					ENDPOINTS
	//---------------------------------

	//send a valid username and password, receive an auth token and the payload specified
	//in sendOrganizationInfo above
	app.post('/login', (req, res) => {
		User.getUser(req.body.username, user => {
			
			if (user && bcrypt.compareSync(req.body.password, user.get('password'))) {
				
				Organization.getOrganization(user.get('orgID'), org => {
					if (org) {
						sendOrganizationInfo(user, org, res);		
					} else{
						res.sendStatus(500);
					}
				});

			} else {
				res.sendStatus(404);
			}
		});
	});


	//create a new organization and admin
	app.post('/signup', (req, res) => {
		Organization.getOrganizationByName(req.body.orgName, org => {
			
			User.getUser(req.body.username, user => {
				
				//first check that organization name and admin username are available
				if (org && user) {
					res.sendStatus(400);			
				} else if (org) {
					res.sendStatus(401);
				} else if (user) {
					res.sendStatus(403);
				} else {	

					Organization.makeOrganization({ name: req.body.orgName }, org => {
						if (org) {
							
							User.makeUser(
								{
									orgID: org.attributes.id,
									password: bcrypt.hashSync(req.body.password),
									permissions: 'admin',
									username: req.body.username
								}, user => {
									
									if (user) {
										sendOrganizationInfo(user, org, res);
									} else {
										res.sendStatus(500);
									}
						
								});
						
						} else {
							res.sendStatus(500);
						}
					});
				}
			});
		});
	});


	//used upon a page reload. If the client has a valid token then this route will send
	//the same organization info as a login
	app.post('/token', (req, res) => {
		if (req.body.token) {
			jwt.verify(req.body.token, 'SSSHHHitsaSECRET', (err, user) => {
			
				if (err) {
					res.sendStatus(401);

				} else {		
					User.getUser(user.username, user => {

						if (user) {
							Organization.getOrganization(user.get('orgID'), org => {
								
								if (org) {
									sendOrganizationInfo(user, org, res, req.body.token);									
								} else {
									res.sendStatus(401);
								}
							
							});
						
						} else {
							res.sendStatus(401);
						}
					});
				}
			});

		} else {
			res.sendStatus(401);
		}
	});

	return app;
};






//------------------------------------------------------------------------------
//
//													BUDGET ENDPOINTS
//
//------------------------------------------------------------------------------

const budgetAPI = app => {

	app.get('/api/budgets/:projIDs', (req, res) => {
		let projIDs = req.param.projIDs.split('-');

		Budget.getBudgets(
			projIDs,
			budgets => res.status(200).json(budgets),
			error => res.sendStatus(500)
		);
	});


	app.delete('/api/budgets/:IDs', (req, res) => {
		Budget.deleteBudget(
			req.params.id.split('-'),
			success => res.sendStatus(200),
			error => res.sendStatus(500)
		);
	});


	app.patch('/api/budgets/:id', (req, res) => {
		Budget.updateBudget(
			req.params.id,
			req.body,
			success => res.sendStatus(200),
			error => res.sendStatus(500)
		);
	});


	// makes budgets w/ the provided data and returns them
	//
	// req body should hold an array of objects w/ structure
	//
	// {
	//		cost: float,
	//		description: string,
	//    glCode: int,
	//    projID: int,        <------- foreign key for project to own budget
	//		quantity: int,
	//		total: float
	// }
	//
	app.post('/api/budgets', (req, res) => {
		Budget.makeBudgets(
			req.body,
			budgets => res.status(201).json(budgets),
			error => res.sendStatus(500)
		);
	});

	return app;
};






//------------------------------------------------------------------------------
//
//													EXPENSE ENDPOINTS
//
//------------------------------------------------------------------------------

const expenseAPI = app => {

	app.get('/api/expenses/:projIDs', (req, res) => {
		let projIDs = req.param.projIDs.split('-');

		Expense.getExpenses(
			projIDs,
			expenses => res.status(200).json(expenses),
			error => res.sendStatus(500)
		);
	});


	app.delete('/api/expenses/:id', (req, res) => {
		Expense.deleteExpense(
			req.params.id,
			success => res.sendStatus(200),
			error => res.sendStatus(500)
		);
	});


	app.patch('/api/expenses/:id', (req, res) => {
		Expense.updateExpense(
			req.params.id,
			req.body,
			success => res.sendStatus(200),
			error => res.sendStatus(500)
		);
	});


	// makes expenses w/ the provided data and returns them to client
	// updates total cost for the associated (singular) project
	//
	// req body should hold an array of objects w/ structure
	//
	// {
	//    category: string,
	//    cost: float,
	//    dateSpent: string,
	//    dateTracked: string,
	//    description: string,
	//    glCode: string,
	//    method: string,
	//    projID: int,        <------- foreign key for the project the expense is attached to
	//    type: string,
	//    vendor: string,
	//    vertical: string
	// }
	//
	app.post('/api/expenses/:projID', (req, res) => {
		Expense.makeExpenses(
			req.body,
			expenses => {
				Project.getProject(
					req.params.projID,
					project => {
						
						let cost = project
							.related('expenses')
							.reduce((cost, expense) => cost + expense.get('cost'), 0);
					
						Project.updateProject(
							project.get('id'),
							{ costToDate: cost },
							success => res.status(200).json(expenses),
							error => res.sendStatus(500)
						);

					},
					error => res.sendStatus(500)
				);

			},
			error => res.sendStatus(500)
		);
	});

	return app;
};






//------------------------------------------------------------------------------
//
//													PROJECT ENDPOINTS
//
//------------------------------------------------------------------------------

const projectAPI = app => {

	app.patch('/api/projects/:id', (req, res) => {
		Project.updateProject(
			req.params.id,
			req.body,
			success => res.sendStatus(200),
			error => res.sendStatus(500)
		);
	});


	// Creates a new project with the provided data and returns it
	//
	// req.body should hold
	// {
	// 		costToDate: float,
	// 		estimateToComplete: float,
	// 		name: string,
	// 		needs: string,
	// 		orgs_id: int,       <------- foreign key for the organization the project is attached to
	// 		projID: string,
	// 		reqBudget: float,
	// 		shootDates: string,
	// 		status: string,
	// 		type: string
	// }
	app.post('/api/projects', (req, res) => {
		Project.makeProject(req.body, proj => {
			if (proj) {
				res
					.status(201)
					.json(proj);

			} else {
				res.sendStatus(404);
			}
		});
	});

	return app;
};






//------------------------------------------------------------------------------
//
//														USER ENDPOINTS
//
//------------------------------------------------------------------------------

const userAPI = app => {

	app.delete('/api/users/:id', (req, res) => {
		User.deleteUser(
			req.params.id,
			success => res.sendStatus(200),
			error => res.sendStatus(500)
		);
	});


	app.patch('/api/users', (req, res) => {
		User.updateUser(
			req.params.id,
			req.body,
			success => res.sendStatus(200),
			error => res.sendStatus(500)
		);
	});


	// makes a user with supplied criteria and returns the user model
	// if a user with that username already exists return a 403
	//
	// req.body should be
	// {
	//    orgs_id: int
	//    password: string,
	//    perm: int,
	//    username: string,
	// }
	app.post('/api/users', (req, res) => {
		User.getUser(req.body.username, user => {
			if (user) {
				res.sendStatus(403);
			
			} else {
				req.body.password = bcrypt.hashSync(req.body.password);
				User.makeUser(req.body, user => {
					
					if (user) {
						res.status(201).json(user);
					} else {
						res.sendStatus(500);
					}
				
				});
			}
		});
	});

	return app;
};


module.exports = app => authAPI(budgetAPI(expenseAPI(projectAPI(userAPI(app)))));

