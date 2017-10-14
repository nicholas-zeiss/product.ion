/**
 *
 *  Some utilities for processing CSV exports/imports
 *
**/


const FIELDS = [
	'Project',
	'Name',
	'Project ID',
	'Type',
	'Vertical',
	'Tier',
	'Status',
	'Number of Assets',
	'Start Date',
	'End Date',
	'Edit Date',
	'Release Date',
	'Requested Budget',
	'Cost to Date',
	'Estimate to Complete',
	'Expense',
	'Category',
	'GL Code',
	'Date Spent',
	'Date Tracked',
	'Vendor',
	'Method',
	'Description',
	'Cost'
];


//takes an array of objects with an expense and a project key-value pair and returns
//an array of flattened expenses
const expandExpenses = expenses => (
	expenses.map(expense => {
		let project = expense.project;
		expense = expense.expense;

		return [
			' ',
			project.name,
			project.projID,
			project.type,
			project.vertical,
			project.tier,
			project.status,
			project.numAssets,
			project.startDate,
			project.endDate,
			project.editDate,
			project.releaseDate,
			project.reqBudget,
			project.costToDate,
			project.estimateToComplete,
			' ',
			expense.category,
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


export { expandExpenses, FIELDS };

