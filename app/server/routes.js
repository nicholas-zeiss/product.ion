/**
 *
 *	Creates our API endpoints for interacting with the database
 *
**/


//Import Bookshelf controllers
var Budget = require('./controllers/budgetController.js');
var Expense = require('./controllers/expenseController.js');
var Organization = require('./controllers/organizationController.js');
var Project = require('./controllers/projectController.js');
var User = require('./controllers/userController.js');

var jwt = require('jsonwebtoken');



//-----------------------------------
//				utility functions
//-----------------------------------

//generates a nicely formatted date string
function generateDate() {
	let date = new Date();

	let year = date.getFullYear();
	let month = ('0' + date.getMonth()).slice(-2);
	let day = ('0' + date.getDate()).slice(-2);

	return year + '/' + month + '/' + day;
}


//generates a JWT for verification
function generateToken(user) {
	user = {
		username: user.attributes.username,
		id: user.id
	};
  
	return jwt.sign(user, 'SSSHHHitsaSECRET', { expiresIn: '12h' });
}


//when an expense is added/removed from a project, use this to update project costToDate
//takes a callback which is executed on the project model once updated
function updateProjectCost(projId, cb) {
	Project.getProjById(projId, proj => {
		Expense.getExpensesByProj(projId, exps => {
			let date = generateDate();
			let cost = exps.reduce((cost, exp) => cost + exp.get('cost'), 0);

			proj
				.save({ costToDate: cost, lastEdited: date })
				.then(cb);
		});
	});
}


//-----------------------------------
//					API Endpoints
//-----------------------------------

module.exports = app => {
	//welcome to callback hell, may your visit be short

	//----------------------------------
	//
	//				AUTHORIZATION
	//
	//----------------------------------

	//given a username send back the user object, the organization of the user, and projects of the organization.
	//as this is used for login, it also sends a JWT for authentication
	app.post('/login', (req, res) => {
		User.getUser(req.body.username, user => {
			if (user) {
				delete user.attributes.password;

				res
					.status(201)
					.json({ user, token: generateToken(user) });
			
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

				} else {
					User.getUser(user.username, function (user) {
						if (user) {
							delete user.attributes.password;

							res
								.status(200)
								.json(user);
						
						} else {
							res.sendStatus(404);
						}
					});
				}
			});

		} else {
			res
				.status(401)
				.json({ message: 'Must pass token' });
		}
	});



	//----------------------------------
	//
	//						GET DATA
	//
	//----------------------------------

	//gets the budget for the project specified by the project ID (the projId propery of projects, not the primary index in the database)
	app.post('/api/get/budget', (req, res) => {
		Budget.getBudget(req.body.projId, budgetArray => {
			if (budgetArray) {
				res
					.status(201)
					.json(budgetArray);

			} else {
				res.sendStatus(404);
			}
		});
	});


	//this project accepts an array of project IDs (the projId propery of projects, not the primary index in the database)
	//and returns all expenses attached to those projects
	app.post('/api/get/expenses', (req, res) => {
		var exps = [];

		req.body.projIds.forEach(projId => {
			Project.getProj(projId, proj => {
				if (proj) {				
					exps.push(proj.related('expenses'));
				
					//only sends response when all of the asynchronous bookshelf requests are completed
					if (exps.length == req.body.projIds.length) {
						res
							.status(201)
							.json(exps);
					}

				} else {
					res.sendStatus(404);
				}
			});
		});
	});


	//given an organization name send back the organization object with its attached users and projects
	app.post('/api/get/org', (req, res) => {
		Organization.getOrg(req.body.orgName, org => {
			if (org) {
				res
					.status(201)
					.json(org);

			} else {
				res.sendStatus(404);
			}
		});
	});


	//given a project ID send the project with related expenses, budgets, users and organization
	app.post('/api/get/proj', (req, res) => {
		Project.getProj(req.body.projId, proj => {
			if (proj) {
				res.status(201).json(proj);

			} else {
				res.sendStatus(404);
			}
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
	app.post('/api/register/budget', (req, res) => {
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


	//used for creating a new organization, checks whether organization name and admin username are available
	app.post('/api/register/check', (req, res) => {
		Organization.getOrg(req.body.orgName, org => {
			User.getUser(req.body.username, user => {
				if (org && user) {
					res.sendStatus(400);

				} else if (org) {
					res.sendStatus(401);

				} else if (user) {
					res.sendStatus(403);

				} else {
					res.sendStatus(200);
				}
			});
		});
	});


	//this route is used for mass importing expenses to a project via a csv file. req.body.data holds an array of expenses, each
	//representing a row in the csv. req.body.id holds the project ID
	app.post('/api/register/csv', function(req, res) {
		let count = 0;

		req.body.data.forEach(exp => {
			let updatedExp = Object.assign({}, exp, { projs_id: req.body.id });

			Expense.makeExpense(updatedExp, exp => {
				if (exp) {
					count++;

					//only sends response when all of the asynchronous bookshelf requests are completed
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
	app.post('/api/register/expense', (req, res) => {
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


	//make an organization w/ name req.body.orgName and return it, WARNING doesn't check to see if that organization name is available
	app.post('/api/register/org', (req, res) => {
		Organization.makeOrg({ name: req.body.orgName }, org => {
			if (org) {
				res
					.status(201)
					.json(org);
			
			} else {
				res.sendStatus(404);
			}
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
	// 		projId: string,
	// 		reqBudget: float,
	// 		shootDates: string,
	// 		status: string,
	// 		type: string
	// }
	app.post('/api/register/project', (req, res) => {
		Project.makeProj(req.body, proj => {
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
	app.post('/api/register/user', (req, res) => {
		User.getUser(req.body.username, user => {
			if (user) {
				res.sendStatus(403);
			
			} else {
				User.makeUser(req.body, user => {
					if(user) {
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


	//update project specified by req.body.projId w/ key-value pairs in req.body.data
	app.post('/api/update/proj', (req, res) => {
		Project.getProj(req.body.projId, proj => {
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
