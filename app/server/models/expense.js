/**
 *
 *  Here we set up a a Bookshelf model for expenses
 *
**/


const Bookshelf = require('../db.js');

require('./project.js');


module.exports = Bookshelf.model('Expense', Bookshelf.Model.extend({
	tableName: 'expenses',

	project: function() {
		return this.belongsTo('Project', 'projID');
	}
}));

