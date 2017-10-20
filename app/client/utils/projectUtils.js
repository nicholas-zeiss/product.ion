/**
 *
 *	Utilities for working with project objects
 *
**/


// only included to work with jsx
import React from 'react';

import { currDateString } from './misc';


export const projectTableHeader = (
	<thead>
		<tr id='readOnlyHeader'>
			<th> Name </th>
			<th> ID </th>
			<th> Created By </th>
			<th> Status </th>
			<th> Cost to Date </th>
			<th> Estimate to Complete </th>
		</tr>
	</thead>
);


// Generate an empty budget item
export const budgetDefaults = () => ({
	cost: 0,
	description: '',
	glCode: 0,
	quantity: 0,
	total: 0
});


// Generate an empty project
export const projectDefaults = (orgID, userID) => ({
	adminNotes: '',
	approvals: '1111111111',
	costToDate: 0,
	editDate: currDateString(),
	endDate: currDateString(),
	name: '',
	numAssets: 0,
	orgID: orgID,
	releaseDate: currDateString(),
	reqBudget: 0,
	startDate: currDateString(),
	status: 'Pitch',
	tier: 'BR',
	type: 'Feature',
	userID: userID,
	vertical: 'Food'
});


//order of keys in approval string, used in following two functions
export const approvalStringOrder = [
	'endDate',
	'editDate',
	'numAssets',
	'name',
	'releaseDate',
	'reqBudget',
	'startDate',
	'tier',
	'vertical',
	'type'
];


// One property of projects is approvals, which represent the approval state
// of other properties for a project while it is still a pitch and not approved for production. Due to
// database limitations, it is stored as a string of 1s and 0s to represent approved/unapproved.
// This converts that into a much more useable form.
export const genApprovalObject = string => {
	let approvalObject = {};

	approvalStringOrder.forEach((key, index) => {
		approvalObject[key] = string[index] == '1' ? true : false;
	});

	return approvalObject;
};


// Converts the usable form from the function above back into a string to be stored in the database.
export const genApprovalString = approvals => {
	let approvalString = [];

	approvalStringOrder.forEach((key, index) => {
		approvalString[index] = approvals[key] ? '1' : '0';
	});

	return approvalString.join('');
};

