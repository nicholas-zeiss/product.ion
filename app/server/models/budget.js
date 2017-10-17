/**
 *
 *  Here we set up a a Bookshelf model for budgets
 *
**/


const Bookshelf = require('../db.js');


module.exports = Bookshelf.model('Budget', Bookshelf.Model.extend({
	tableName: 'budgets',
	
	project: () => this.belongsTo('Project', 'projID')
	
}));

