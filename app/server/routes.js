/**
 *
 *	Creates our API endpoints for interacting with the database
 *
 *	Welcome to callback hell, may your visit be short...
 *
**/


const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// import Bookshelf controllers
const Budget = require('./controllers/budgetController.js');
const Expense = require('./controllers/expenseController.js');
const Organization = require('./controllers/organizationController.js');
const Project = require('./controllers/projectController.js');
const User = require('./controllers/userController.js');

const utils = require('./utils.js');


//------------------------------------------------------------------------------
//
//												AUTHORIZATION ENDPOINTS
//
//------------------------------------------------------------------------------


const authAPI = app => {

	// send a valid username and password, receive an auth token and the payload specified in sendOrganizationInfo above
	app.post('/login', (req, res) => {
		User.getUser(req.body.username, user => {
			
			if (user && bcrypt.compareSync(req.body.password, user.get('password'))) {
				
				Organization.getOrganization(user.get('orgID'), org => {
					if (org) {
						utils.sendOrganizationInfo(user, org, res);		
					} else{
						res.sendStatus(500);
					}
				});

			} else {
				res.sendStatus(404);
			}
		});
	});


	// create a new organization and admin
	//
	// req body should hold
	//
	// {
	//    orgName: string,
	//		username: string,
	//		password: string
	// }
	//
	app.post('/signup', (req, res) => {
		Organization.getOrganizationByName(req.body.orgName, org => {
			
			User.getUser(req.body.username, user => {
				
				// first check that organization name and admin username are available
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
										utils.sendOrganizationInfo(user, org, res);
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


	// Used upon a page reload. If the client has a valid token then this route will send
	// the same organization info as a login
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
									utils.sendOrganizationInfo(user, org, res, req.body.token);									
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

	// get all budget items for all projects w/ id in projIDs
	app.get('/api/budgets/:projIDs', (req, res) => {
		let projIDs = req.params.projIDs.split('-');

		Budget.getBudgets(
			projIDs,
			budgets => res.status(200).json(budgets),
			error => res.sendStatus(500)
		);
	});


	// delete all budget items w/ id in IDs linked to project w/ id = projID
	// updates reqBudget attribute of project on deletion
	app.delete('/api/budgets/:IDs/:projID', (req, res) => {
		let IDs = req.params.IDs.split('-');

		Budget.deleteBudgets(
			IDs,
			success => utils.updateProject(req.params.projID, 'budgets', res, false),
			error => res.sendStatus(500)
		);
	});


	// currently not inuse
	app.patch('/api/budgets', (req, res) => {
		Budget.updateBudget(
			req.body,
			budget => utils.updateProject(budget.get('projID'), 'budgets', res, false),
			error => res.sendStatus(500)
		);
	});


	// makes budgets of the provided array of budget objects linked to project w/ id = projID
	// and returns them
	//
	// req body must hold an array of objects w/ structure
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
	app.post('/api/budgets/:projID', (req, res) => {
		Budget.makeBudgets(
			req.body,
			budgets => utils.updateProject(req.params.projID, 'budgets', res, budgets),
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
	
	// get all expense items for all projects w/ id in projIDs
	app.get('/api/expenses/:projIDs', (req, res) => {
		let projIDs = req.params.projIDs.split('-');

		Expense.getExpenses(
			projIDs,
			expenses => res.status(200).json(expenses),
			error => res.sendStatus(404)
		);
	});


	// delete all expense items w/ id in IDs linked to project w/ id = projID
	// updates costToDate attribute of project on deletion
	app.delete('/api/expenses/:id/:projID', (req, res) => {
		Expense.deleteExpense(
			req.params.id,
			success => utils.updateProject(req.params.projID, 'expenses', res, false),
			error => res.sendStatus(500)
		);
	});


	// currently not in use
	app.patch('/api/expenses', (req, res) => {
		Expense.updateExpense(
			req.body,
			expense => utils.updateProject(expense.get('projID'), 'expenses', res, false),
			error => res.sendStatus(500)
		);
	});


	// makes expenses w/ the provided data and returns them to client
	// updates total cost for the associated (singular) project
	//
	// req body must hold an array of objects w/ structure
	//
	// {
	//    cost: float,
	//    dateSpent: string,
	//    dateTracked: string,
	//    description: string,
	//    glCode: string,
	//    method: string,
	//    projID: int,        <------- foreign key for the project the expense is attached to
	//    vendor: string,
	// }
	//
	app.post('/api/expenses/:projID', (req, res) => {
		Expense.makeExpenses(
			req.body,
			expenses => utils.updateProject(req.params.projID, 'expenses', res, expenses),
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

	// update project item w/ req.body object, req.body must have id attribute
	app.patch('/api/projects', (req, res) => {
		Project.updateProject(
			req.body,
			project => res.status(200).json(project),
			error => res.sendStatus(500)
		);
	});


	// Creates a new project with the provided data and returns it
	//
	// req.body must hold
	// {
	//		adminNotes: string,		
	//		approvals: string,
	//		costToDate: float,
	//		editDate: string,
	// 		endDate: string,
	// 		name: string,
	//		numAssets: int,
	// 		orgID: int,       <------- foreign key for the organization the project is attached to
	//		releaseDate: string,
	//		reqBudget: float,
	//		startDate: string,
	//		status: string,
	//		tier: string,
	// 		type: string,
	//		userID: int,			<------- foreign key for the user who created it
	//		vertical: string
	// }
	//
	app.post('/api/projects', (req, res) => {
		req.body.lastEdited = utils.dateString();

		Project.makeProject(req.body, project => {
			if (project) {
				res.status(201).json(project);

			} else {
				res.sendStatus(500);
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

	// currently not in use
	app.delete('/api/users/:id', (req, res) => {
		User.deleteUser(
			req.params.id,
			success => res.sendStatus(200),
			error => res.sendStatus(500)
		);
	});


	// update user object w/ req.body, req.body must have id
	app.patch('/api/users', (req, res) => {
		if (req.body.password) {
			req.body.password = bcrypt.hashSync(req.body.password);
		}

		User.updateUser(
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
	//    orgID: int
	//    password: string,
	//    permissions: string,
	//    username: string,
	// }
	//
	app.post('/api/users', (req, res) => {
		User.getUser(req.body.username, user => {
			if (user) {
				res.sendStatus(403);
			
			} else {
				req.body.password = bcrypt.hashSync(req.body.password);
				User.makeUser(req.body, user => {
					
					if (user) {
						res
							.status(201)
							.json({ 
								id: user.get('id'),
								permissions: user.get('permissions'),
								username: user.get('username')
							});

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

