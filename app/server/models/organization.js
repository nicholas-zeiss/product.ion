/**
 *
 *  Here we set up a a Bookshelf model for organizations
 *
**/


const Bookshelf = require('../db.js');


module.exports = Bookshelf.model('Organization', Bookshelf.Model.extend({
	tableName: 'organizations',

	projects: () => this.hasMany('Project', 'orgID'),
	
	users: () => this.hasMany('User', 'orgID')

}));

