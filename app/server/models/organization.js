/**
 *
 *  Here we set up a a Bookshelf model for organizations
 *
**/


const Bookshelf = require('../db.js');


module.exports = Bookshelf.model('Organization', Bookshelf.Model.extend({
	tableName: 'orgs',
	
	users: function() {
		return this.hasMany('User', 'orgID');
	},
	
	projects: function() {
		return this.hasMany('Project', 'orgID');
	}
}));

