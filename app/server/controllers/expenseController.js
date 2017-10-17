/**
 *
 *  Here we set up a controller for our expense model
 *
**/


const Bookshelf = require('../db.js');

const Expense = require('../models/expense.js');
const Expenses = Bookshelf.Collection.extend({
	model: Expense
});


exports.deleteExpense = (id, success, error) => {
	new Expense({ id })
		.destroy()
		.then(success)
		.catch(error);
};


exports.getExpenses = (projIDs, success, error) => {
	Expense
		.where('projID', 'in', projIDs)
		.fetchAll()
		.then(success)
		.catch(error);
};


exports.makeExpenses = (expenseArray, success, error) => {
	new Expenses(expenseArray)
		.invokeThen('save')
		.then(success)
		.catch(error);
};


exports.updateExpenses = (id, data, success, error) => {
	new Expense({ id })
		.save(data, { patch: true })
		.then(success)
		.catch(error);
};

