/**
 *
 *  This file instantiates our sql database using sqlite, knex, and bookshelf. Exports bookshelf to be used
 *  setting up models/controllers for our data.
 *
**/


const path = require('path');

const knex = require('knex')({
	client: 'sqlite3',
	connection: {
		filename: path.resolve(__dirname, './data/data.sqlite')
	},
	useNullAsDefault: true
});


// Here we use a Promise.all to handle table creation, doing it synchronously introduces conflicts where foreign keys
// reference tables that have not been created
Promise.all([

	// holds budgets for unapproved projects
	knex.schema.createTableIfNotExists('budgets', table => {
		table.increments('id').primary();
		table.float('cost');
		table.string('description');
		table.integer('glCode');
		table.integer('projID').unsigned().references('id').inTable('projects');
		table.integer('quantity');
		table.float('total');
	}),


	// holds expenses for projects
	knex.schema.createTableIfNotExists('expenses', table => {
		table.increments('id').primary();
		table.float('cost');
		table.string('dateSpent');
		table.string('dateTracked');
		table.string('description');
		table.integer('glCode');
		table.string('method');
		table.integer('projID').unsigned().references('id').inTable('projects');
		table.string('vendor');
	}),


	// holds organizations
	knex.schema.createTableIfNotExists('organizations', table => {
		table.increments('id').primary();
		table.string('name').unique();
	}),


	// holds projects for organizations
	knex.schema.createTableIfNotExists('projects', table => {
		table.increments('id').primary();
		table.string('adminNotes', 1000);
		table.string('approvals', 10);
		table.float('costToDate').defaultTo(0);
		table.string('editDate');
		table.string('endDate');
		table.string('lastEdited');
		table.string('name').unique();
		table.integer('numAssets').defaultTo(1);
		table.integer('orgID').unsigned().references('id').inTable('organizations');
		table.string('releaseDate');
		table.float('reqBudget').defaultTo(0);
		table.string('startDate');
		table.string('status');
		table.string('tier', 20);
		table.string('type');
		table.integer('userID').unsigned().references('id').inTable('users');
		table.string('vertical', 20);
	}),


	// holds user accounts w/ username, password, permission level, and the organization they belong to
	knex.schema.createTableIfNotExists('users', table => {
		table.increments('id').primary();
		table.integer('orgID').unsigned().references('id').inTable('organizations');
		table.string('password');
		table.string('permissions');
		table.string('username').unique();
	})
]);


const Bookshelf = require('bookshelf')(knex);

// allows us to register models by name to avoid having to import a model
// whenever it is used elsewhere
Bookshelf.plugin('registry');

module.exports = Bookshelf;

