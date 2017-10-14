/**
 *
 *  Here we set up a controller for our expense model
 *
**/


const Expense = require('../models/expense.js');


exports.getExpense = (id, cb) => {
	new Expense({ id })
		.fetch({
			withRelated: [ 'proj' ]
		})
		.then(cb); 
};

exports.makeExpense = (data, cb) => {
	new Expense(data)
		.save()
		.then(cb);
};

