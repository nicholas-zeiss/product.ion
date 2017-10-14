/**
 *
 *  Here we set up a a Bookshelf model for projects
 *
**/


const Bookshelf = require('../db.js');


module.exports = Bookshelf.model('Project', Bookshelf.Model.extend({
	tableName: 'projects',
	
	budgets: function() {
		return this.hasMany('Budget', 'projID');
	},

	expenses: function() {
		return this.hasMany('Expense', 'projID');
	},

	organization: function() {
		return this.belongsTo('Organization', 'orgID');
	},
	
	users: function() {
		return this.belongsToMany('User', 'projects_users', 'projID', 'userID');
	}
}));

