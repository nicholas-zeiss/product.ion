/**
 *
 *  Some utilities for processing CSV exports/imports
 *
**/


const fields = [
	'Project ID',
	'Name',
	'Type',
	'Expense ID',
	'GL Code',
	'Date Spent',
	'Date Tracked',
	'Vendor',
	'Method',
	'Description',
	'Cost'
];


// takes an array of objects with an expense and a project key-value pair and returns
// an array of flattened expenses
const expandExpenses = (expenses, projects) => (
	expenses.map(expense => {
		let project = projects.find(proj => proj.id == expense.projID);

		return [
			project.id,
			project.name,
			project.type,
			expense.id,
			expense.glCode,
			expense.dateSpent,
			expense.dateTracked,
			expense.vendor,
			expense.method,
			expense.description,
			expense.cost
		];
	})
);


export { expandExpenses, fields };

