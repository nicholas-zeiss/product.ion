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


exports.makeExpenses = (expenses, success, error) => {
	new Expenses(expenses)
		.invokeThen('save')
		.then(success)
		.catch(error);
};


exports.updateExpense = (expense, success, error) => {
	new Expense({ id: expense.id })
		.save(expense, { patch: true })
		.then(success)
		.catch(error);
};

