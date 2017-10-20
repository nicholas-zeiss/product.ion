/**
 *
 *  Here we set up a controller for our budget model
 *
**/


const Bookshelf = require('../db.js');

const Budget = require('../models/budget.js');
const Budgets = Bookshelf.Collection.extend({
	model: Budget
});


exports.deleteBudgets = (IDs, success, error) => {
	Budget
		.where('id', 'in', IDs)
		.fetchAll()
		.then(budgets => {
			budgets
				.invokeThen('destroy')
				.then(success)
				.catch(error);
		})
		.catch(error);
};


exports.getBudgets = (projIDs, success, error) => {
	Budget
		.where('projID', 'in', projIDs)
		.fetchAll()
		.then(success)
		.catch(error);
};


exports.makeBudgets = (budgetArray, success, error) => {
	new Budgets(budgetArray)
		.invokeThen('save')
		.then(success)
		.catch(error);
};


exports.updateBudget = (budget, success, error) => {
	new Budget({ id: budget.id })
		.save(budget, { patch: true })
		.then(success)
		.catch(error);
};

