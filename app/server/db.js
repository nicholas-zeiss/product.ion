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

const Bookshelf = require('bookshelf')(knex);

// allows us to register models by name to avoid having to import a model
// whenever it is used elsewhere
Bookshelf.plugin('registry');


knex.schema.hasTable('organizations')
	.then(dbBuilt => {
		if (dbBuilt) {
			return;
		}

		createOrganizationsTable()
			.then(createUsersTable)
			.then(createProjectsTable)
			.then(createBudgetsTable)
			.then(createExpensesTable)
			.catch(err => console.error(err));
	})
	.catch(err => console.error(err));


//--------------------------------------------------------------------
//
//										Helpers for initializing the database
//
//--------------------------------------------------------------------


function createBudgetsTable() {
	return knex.schema.createTable('budgets', table => {
		table.increments('id').primary();
		table.float('cost');
		table.string('description');
		table.integer('glCode').defaultsTo(0);
		table.integer('projID').unsigned().references('id').inTable('projects');
		table.integer('quantity');
		table.float('total');
	});
}


function createExpensesTable() {
	return knex.schema.createTable('expenses', table => {
		table.increments('id').primary();
		table.float('cost');
		table.string('dateSpent');
		table.string('dateTracked');
		table.string('description');
		table.integer('glCode');
		table.string('method');
		table.integer('projID').unsigned().references('id').inTable('projects');
		table.string('vendor');
	});
}


function createOrganizationsTable() {
	return knex.schema.createTable('organizations', table => {
		table.increments('id').primary();
		table.string('name').unique();
	});
}


function createProjectsTable() {
	return knex.schema.createTable('projects', table => {
		table.increments('id').primary();
		table.string('adminNotes', 1000);
		table.string('approvals', 10);
		table.float('costToDate').defaultTo(0);
		table.string('editDate');
		table.string('endDate');
		table.string('lastEdited');
		table.string('name');
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
	});
}


function createUsersTable() {
	return knex.schema.createTable('users', table => {
		table.increments('id').primary();
		table.integer('orgID').unsigned().references('id').inTable('organizations');
		table.string('password');
		table.string('permissions');
		table.string('username').unique();
	});
}


module.exports = Bookshelf;

