//  the body of these functions will look like something like this here
//  
//  exports.getUser = function(name, callback) {
//    new User({username: name}).fetch().then(callback);
//  };
// 
// this is example usage
// 
// app.post('/login', function(req, res) {
//   Users.getUser(req.body.username, function(user) {
//     user ? res.status(201).json(user) : res.sendStatus(404);
//   });
// });
var Expense = require('../models/expense.js');

exports.getExpense = function(id, cb) {
	new Expense({id: id}).fetch({withRelated: ['proj']}).then(cb); 
}

exports.getExpensesByProj = function(id, cb) {
	new Expense().query("where","projs_id","=",id).fetchAll().then(cb);
}

exports.makeExpense = function(data, cb) {
	new Expense(data).save().then(cb);
}