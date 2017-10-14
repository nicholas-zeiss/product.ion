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

	//holds budgets for unapproved projects
	knex.schema.createTableIfNotExists('budgets', table => {
		table.increments('id').primary();
		table.float('cost');
		table.string('description');
		table.integer('glCode');
		table.integer('projID').unsigned().references('id').inTable('projects');
		table.integer('quantity');
		table.float('total');
	}),


	//holds expenses for projects
	knex.schema.createTableIfNotExists('expenses', table => {
		table.increments('id').primary();
		table.string('category');
		table.float('cost');
		table.date('dateSpent');
		table.date('dateTracked');
		table.string('description');
		table.string('glCode');
		table.string('method');
		table.integer('projID').unsigned().references('id').inTable('projects');
		table.string('vendor');
	}),


	//holds organizations
	knex.schema.createTableIfNotExists('organizations', table => {
		table.increments('id').primary();
		table.string('name').unique();
	}),


	//holds projects for organizations
	knex.schema.createTableIfNotExists('projects', table => {
		table.increments('id').primary();
		table.string('adminNotes', 1000);
		table.string('approvals', 12).defaultTo('111111111111');
		table.float('costToDate').defaultTo(0);
		table.integer('createdBy');
		table.date('editDate');
		table.date('endDate');
		table.float('estimateToComplete');
		table.date('lastEdited').defaultTo(Date.now());
		table.string('name');
		table.integer('numAssets').defaultTo(1);
		table.integer('orgID').unsigned().references('id').inTable('organizations');
		table.string('projID');
		table.date('releaseDate');
		table.float('reqBudget').defaultTo(0);
		table.date('startDate');
		table.string('status');
		table.string('tier', 20);
		table.string('type');
		table.string('vertical', 20);
	}),


	//links projects to the users who created them
	knex.schema.createTableIfNotExists('projects_users', table => {
		table.integer('projID').references('id').inTable('projects');
		table.integer('userID').references('id').inTable('users');
	}),


	//holds user accounts w/ username, password, permission level, and the organization they belong to
	knex.schema.createTableIfNotExists('users', table => {
		table.increments('id').primary();
		table.integer('orgID').unsigned().references('id').inTable('organizations');
		table.string('password');
		table.integer('permissions');
		table.string('username').unique();
	})
]);


const Bookshelf = require('bookshelf')(knex);

Bookshelf.plugin('registry');

module.exports = Bookshelf;

