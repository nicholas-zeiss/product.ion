/**
 *
 *  Here we set up a controller for our budget model
 *
**/


const Budget = require('../models/budget.js');


exports.getBudget = (id, cb) => {
	new Budget({ id })
		.fetch()
		.then(cb);
};


exports.makeBudget = (data, cb) => {
	new Budget(data)
		.save()
		.then(cb);
};

