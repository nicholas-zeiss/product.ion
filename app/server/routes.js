/**
 *
 *	Creates our API endpoints for interacting with the database
 *
**/


//Import Bookshelf controllers
const Budget = require('./controllers/budgetController.js');
const Expense = require('./controllers/expenseController.js');
const Organization = require('./controllers/organizationController.js');
const Project = require('./controllers/projectController.js');
const User = require('./controllers/userController.js');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



//-----------------------------------
//				utility functions
//-----------------------------------

//generates a nicely formatted date string
const generateDate = () => {
	let date = new Date();

	let year = date.getFullYear();
	let month = ('0' + date.getMonth()).slice(-2);
	let day = ('0' + date.getDate()).slice(-2);

	return year + '/' + month + '/' + day;
};


//generates a JWT for verification
const generateToken = user => {
	user = {
		username: user.get('username'),
		id: user.get('id')
	};
  
	return jwt.sign(user, 'SSSHHHitsaSECRET', { expiresIn: '12h' });
};


//given an organization model, return an array of the attached users stripped of passwords
const getUsersFromOrganization = org => (
	org
		.related('users')
		.map(user => ({ 
			id: user.get('id'),
			permissions: user.get('permissions'),
			username: user.get('username')
		}))
);


//used when someone logs in or reloads the page and has a valid auth token,
//this sends the base data needed by the app's homepage
const sendOrganizationInfo = (user, org, res, token = generateToken(user)) => {
	res
		.status(200)
		.json({ 
			organization: {
				id: org.get('id'),
				name: org.get('name')
			},
			projects: org.related('projects'),
			token: token,
			user: {
				id: user.get('id'),
				permissions: user.get('permissions'),
				projects: user
					.related('projects')
					.map(project => project.get('id')),
				username: user.get('username')
			},
			users: getUsersFromOrganization(org)
		});
};


//when an expense is added/removed from a project, use this to update project costToDate
//takes a callback which is executed on the project model once updated
const updateProjectCost = (projID, cb) => {
	Project.getProject(projID, project => {
		
		let date = generateDate();
		let cost = project.related('expenses').reduce((cost, exp) => cost + exp.get('cost'), 0);

		project
			.save({ costToDate: cost, lastEdited: date })
			.then(cb);

	});
};



module.exports = app => {
	//welcome to callback hell, may your visit be short

	//---------------------------------------
	//
	//						AUTHORIZATION
	//
	//---------------------------------------

	//given a username send back the user object, the organization of the user, and projects of the organization.
	//as this is used for login, it also sends a JWT for authentication
	app.post('/login', (req, res) => {
		User.getUser(req.body.username, user => {
			if (user && bcrypt.compareSync(req.body.password, user.attributes.password)) {

				delete user.attributes.password;

				Organization.getOrganization(user.get('orgID'), org => {
					if (org) {
						sendOrganizationInfo(user, org, res);
						
					} else{
						res.sendStatus(404);
					}
				});

			} else {
				res.sendStatus(404);
			}
		});
	});


	//used upon a page reload. If the client has a valid token then this route will send back the username and password of the user
	//defined by the token, or a 404 if the user in the token no longer exists
	app.post('/token', (req, res) => {
		if (req.body.token) {
			
			jwt.verify(req.body.token, 'SSSHHHitsaSECRET', (err, user) => {
			
				if (err) {
					console.log(err);
					res.sendStatus(401);

				} else {
					User.getUser(user.username, user => {
						if (user) {

							delete user.attributes.password;

							Organization.getOrganization(user.relations.organization.get('name'), org => {
								if (org) {
									sendOrganizationInfo(user, org, res, req.body.token);
									
								} else{
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



	//----------------------------------
	//
	//				NEW ORGANIZATION
	//
	//----------------------------------

	app.post('/signup', (req, res) => {
		Organization.getOrganization(req.body.orgName, org => {
			User.getUser(req.body.username, user => {
				
				//first check that org name and username are available
				if (org && user) {
					res.sendStatus(400);
				
				} else if (org) {
					res.sendStatus(401);
				
				} else if (user) {
					res.sendStatus(403);
				
				} else {	
					//org name and username are available
					Organization.makeOrganization({ name: req.body.orgName }, org => {
						if (org) {
							
							let user = {
								orgID: org.attributes.id,
								password: bcrypt.hashSync(req.body.password),
								permissions: 'admin',
								username: req.body.username
							};

							User.makeUser(user, user => {
								if (user) {
									let user = {
										id: user.get('id'),
										permissions: user.get('permissions'),
										projects: [],
										username: user.get('username')
									};

									res
										.status(201)
										.json({ 
											organization: {
												id: org.get('id'),
												name: org.get('name')
											},
											user: user,
											users: [{
												id: user.id,
												permissions: user.permissions,
												username: user.username
											}]
										});
								
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



	//----------------------------------
	//
	//						GET DATA
	//
	//----------------------------------


	//given an organization name send back the organization object with its attached users and projects
	app.get('/api/organization/:name', (req, res) => {
		Organization.getOrg(req.params.name, org => {
			if (org) {
				res
					.status(200)
					.json(org);

			} else {
				res.sendStatus(404);
			}
		});
	});


	//given a project ID send the project with related expenses, budgets, users and organization
	app.get('/api/project/:projID', (req, res) => {
		Project.getProj(req.params.projID, proj => {
			if (proj) {
				res
					.status(200)
					.json(proj);

			} else {
				res.sendStatus(404);
			}
		});
	});


	//given a list of project IDs send an array of projects with related expenses, budgets, users and organization
	app.post('/api/projects', (req, res) => {
		let projects = [];

		req.body.projIDs.forEach(projID => {
			Project.getProj(projID, proj => {
				if (proj) {
					projects.push(proj);

					if (projects.length == req.body.projIDs.length) {
						res
							.status(200)
							.json(projects);
					}

				} else {
					res.sendStatus(404);
				}
			});
		});
	});



	//--------------------------------
	//
	//					CREATE DATA
	//
	//--------------------------------

	// makes a budget w/ the provided data and returns it
	//
	// req body should hold
	// {
	//		cost: float,
	//		description: string,
	//    glCode: int,
	//    projs_id: int,        <------- foreign key for the project the expense is attached to
	//		quantity: int,
	//		total: float
	// }
	app.post('/api/budget', (req, res) => {
		Budget.makeBudget(req.body, budget => {
			if (budget) {
				res
					.status(201)
					.json(budget);

			} else {
				res.sendStatus(404);
			}
		});
	});


	//this route is used for mass importing expenses to a project via a csv file. req.body.data holds an array of expenses, each
	//representing a row in the csv. req.body.id holds the project ID
	app.post('/api/csv', function(req, res) {
		let count = 0;

		req.body.data.forEach(exp => {
			let updatedExp = Object.assign({}, exp, { projs_id: req.body.id });

			Expense.makeExpense(updatedExp, exp => {
				if (exp) {
					count++;

					if (count == req.body.datalength) {
						res.sendStatus(201);
					}

				} else {
					res.sendStatus(403);
				}
			});
		});
	});


	// makes an expense w/ the provided data and returns it
	// updates total cost for the associated project
	//
	// req body should hold
	// {
	//    category: string,
	//    cost: float,
	//    dateSpent: string,
	//    dateTracked: string,
	//    description: string,
	//    glCode: string,
	//    method: string,
	//    projs_id: int,        <------- foreign key for the project the expense is attached to
	//    type: string,
	//    vendor: string,
	//    vertical: string
	// }
	app.post('/api/expense', (req, res) => {
		Expense.makeExpense(req.body, exp => {
			updateProjectCost(req.body.projs_id, () => {
				if (exp) {
					res
						.status(201)
						.json(exp);

				} else {
					res.sendStatus(404);
				}
			});
		});
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
	app.post('/api/project', (req, res) => {
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
	app.post('/api/user', (req, res) => {
		User.getUser(req.body.username, user => {
			if (user) {
				res.sendStatus(403);
			
			} else {
				req.body.password = bcrypt.hashSync(req.body.password);

				User.makeUser(req.body, user => {
					if (user) {
						res
							.status(201)
							.json(user);
					
					} else {
						res.sendStatus(500);
					}
				});
			}
		});
	});
	


	//--------------------------------
	//
	//					UPDATE DATA
	//
	//--------------------------------

	//Takes a list of budgets and, one by one, updates the database accordingly
	//If every update succeeds, sends a 201 response with an array of the new budgets.
	//req.body should be [ budget1, budget2, budget3... ]
	app.post('/api/update/budgets', (req, res) => {
		let newBudgets = [];

		req.body.forEach(updatedBudget => {
			Budget.getSingleBudget(updatedBudget.id, budget => {
				if (budget) {
					budget
						.save(updatedBudget)
						.then(newBudget => {
							newBudgets.push(newBudget);
							
							if (newBudgets.length == req.body.length) {
								res
									.status(201)
									.json(newBudgets);
							}
						});

				} else {
					res.sendStatus(404);
				}
			});
		});
	});


	//updates the expense specified by req.body.id
	app.post('/api/update/expense', (req, res) => {
		Expense.getExpense(req.body.id, exp => {
			if (exp) {
				exp
					.save(req.body)
					.then(exp => {
						updateProjectCost(exp.get('projs_id'), () => {
							res
								.status(201)
								.json(exp);
						});
					});

			} else {
				res.sendStatus(404);
			}
		});
	});


	//update project specified by req.body.projID w/ key-value pairs in req.body.data
	app.post('/api/update/proj', (req, res) => {
		Project.getProj(req.body.projID, proj => {
			if (proj) {
				proj
					.save(req.body)
					.then(proj => {
						res
							.status(201)
							.json(proj);
					}); 

			} else {
				res.sendStatus(404);
			}
		});
	});


	//update a user account
	app.post('/api/update/user', (req, res) => {
		User.getUser(req.body.username, user => {
			if (user) {
				user
					.save(req.body)
					.then(user => {
						res
							.status(201)
							.json(user);
					});

			} else {
				res.sendStatus(404);
			}
		});
	});




	//--------------------------------
	//
	//					DELETE DATA
	//
	//--------------------------------

	//delete budget specified by req.body.id (its primary index) and send it
	app.post('/api/remove/budget', (req, res) => {
		Budget.getSingleBudget(req.body.id, budget => {
			if (budget) {
				budget
					.destroy()
					.then(budget => {
						res
							.status(201)
							.json(budget);
					});

			} else {
				res.sendStatus(404);
			}
		});
	});


	//delete expense specified by req.body.id (its primary index) and send it
	app.post('/api/remove/expense', (req, res) => {
		Expense.getExpense(req.body.id, exp => {
			if (exp) {
				exp
					.destroy()
					.then(exp => {
						updateProjectCost(exp.get('projs_id'), () => {
							res
								.status(201)
								.json(exp);
						});
					});

			} else {
				res.sendStatus(404);
			}



		});
	});
};
