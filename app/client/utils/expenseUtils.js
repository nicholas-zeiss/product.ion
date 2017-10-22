/**
 *
 *	Utilities for working with expense objects
 *
**/


// just for working with jsx
import React from 'react';


export const paymentMethods = [
	'Credit Card',
	'Invoice',
	'Payroll',
	'Petty Cash',
	'Misc'
];


export const expenseTableHeader = (
	<tr id='readOnlyHeader'>
		<th>Vendor</th>
		<th>Description</th>
		<th>Cost</th>
		<th>Method</th>
		<th>Expense Type</th>
		<th>GL Code</th>
		<th>Date Spent</th>
		<th>Date Tracked</th>
	</tr>
);


export const newExpenseHeader = (
	<tr>
		<th>Vendor</th>
		<th>Description</th>
		<th>Cost</th>
		<th>Method</th>
		<th>Expense Type</th>
		<th>GL Code</th>
		<th>Date Spent</th>
	</tr>
);


export const defaultExpense = projID => ({
	cost: 0,
	dateSpent: '',
	dateTracked: '',
	description: '',
	glCode: 0,
	method: 'Credit Card',
	projID: projID,
	vendor: ''
});

