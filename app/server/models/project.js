/**
 *
 *  Here we set up a a Bookshelf model for projects
 *
**/


const Bookshelf = require('../db.js');


module.exports = Bookshelf.model('Project', Bookshelf.Model.extend({
	tableName: 'projects',
	
	budgets: () => this.hasMany('Budget', 'projID'),

	expenses: () => this.hasMany('Expense', 'projID'),

	organization: () => this.belongsTo('Organization', 'orgID'),
	
	user: () => this.belongsTo('User', 'userID')

}));

