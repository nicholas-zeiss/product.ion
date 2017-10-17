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
		.invokeThen('destory')
		.then(success)
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


exports.updateBudget = (id, data, success, error) => {
	new Budget({ id })
		.save(data, { patch: true })
		.then(success)
		.catch(error);
};

