/**
 *
 *  Here we set up a a Bookshelf model for users
 *
**/

const Bookshelf = require('../db.js');


module.exports = Bookshelf.model('User', Bookshelf.Model.extend({
	tableName: 'users',
	
	organization: function() {
		return this.belongsTo('Organization', 'orgID');
	},
	
	projects: function() {
		return this.hasMany('Project', 'projects_users', 'userID', 'projID');
	}

}));

