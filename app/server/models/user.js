/**
 *
 *  Here we set up a a Bookshelf model for users
 *
**/

const Bookshelf = require('../db.js');


module.exports = Bookshelf.model('User', Bookshelf.Model.extend({
	tableName: 'users',
	
	organization: () => this.belongsTo('Organization', 'orgID'),
	
	projects: () => this.belongsToMany('Project', 'projects_users', 'userID', 'projID'),

	user: () => this.hasMany('Projects', 'userID')

}));

