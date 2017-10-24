/**
 *
 *	Utilities for working with project objects
 *
**/


// only included to work with jsx
import React from 'react';
import { FormControl } from 'react-bootstrap';

import { currDateString, formatDate, moneyString } from './misc';



//---------------------------------------------------------------------------------------------------------------------
//																						New Project Utilities
//---------------------------------------------------------------------------------------------------------------------

export const inputLabels = {
	editDate: 'Edit Date',
	endDate: 'End Date',
	name: 'Project Name',
	numAssets: 'Number of Assets',
	releaseDate: 'Release Date',
	reqBudget: 'Requested Budget',
	startDate: 'Start Date',
	tier: 'Tier',
	type: 'Video Type',
	vertical: 'Vertical'
};


export const inputStyles ={
	approved: {
		status: 'Approved',
		style: 'success'
	},
	approvedUser: {
		status: 'No issues',
		style: ''
	},
	rejected: {
		status: 'Rejected',
		style: 'danger'
	}
};


export const inputTypes = {
	editDate: 'date',
	endDate: 'date',
	name: 'text',
	numAssets: 'number',
	releaseDate: 'date',
	reqBudget: 'text',
	startDate: 'date',
	tier: 'select',
	type: 'select',
	vertical: 'select'	
};


const tiers = [
	'BR',
	'T1',
	'T2',
	'T3',
	'T4',
	'T5',
	'R29'
];


const types = [
	'Feature',
	'Short',
	'Television',
	'Web',
	'Episode'
];


const verticals = [
	'Food',
	'Beauty',
	'Fashion & Style',
	'News/Politics',
	'News/Web',
	'Wellness',
	'Entertainment'
];


export const options = {
	tier: tiers,
	type: types,
	vertical: verticals
};






//---------------------------------------------------------------------------------------------------------------------
//																						Project Table Utilities
//---------------------------------------------------------------------------------------------------------------------

// table header for short view where multiple projects are displayed
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


// headers for first row of details table
export const detailsFirstHeader = (
	<thead>
		<tr id='readOnlyHeader'>
			<th>Project ID</th>
			<th>Created By</th>
			<th>Vertical</th>
			<th>Tier</th>
			<th>Type</th>
			<th>Number of Assets</th>
			<th>Status</th>
		</tr>
	</thead>
);


// second row
export const detailsSecondHeader = (
	<thead>
		<tr id='readOnlyHeader'>
			<th>Start Date</th>
			<th>End Date</th>
			<th>Edit Date</th>
			<th>Release Date</th>
			<th>Cost to Date</th>
			<th>Requested Budget</th>
		</tr>
	</thead>
);


// first row attribute order
export const detailsFirstRow = [
	'id',
	'username',
	'vertical',
	'tier',
	'type',
	'numAssets',
	'status'
];


// second row order
export const detailsSecondRow = [
	'startDate',
	'endDate',
	'editDate',
	'releaseDate',
	'costToDate',
	'reqBudget'		
];


// column widths for details table
const tableWidths = {
	id: 50,
	username: 145,
	vertical: 145,
	tier: 70,
	type: 145,
	numAssets: 15,
	status: 125,
	startDate: 125,
	endDate: 125,
	editDate: 125,
	releaseDate: 125,
	costToDate: 125,
	reqBudget: 125						
};


// creates table data elements for the project details table
export const projectDetailsEntry = (attr, project, users = []) => {
	let value;

	if (attr == 'username') {
		value = users.find(user => user.id == project.userID);
		value = value ? value.username : '?';

	} else if (attr == 'costToDate' || attr == 'reqBudget') {
		value = moneyString(project[attr]);

	} else if (/Date/.test(attr)) {
		value = formatDate(project[attr]);

	} else {
		value = project[attr];
	}

	return (
		<td key={ attr } width={ tableWidths[attr] }>
			<FormControl value={ value } readOnly/>
		</td>
	);
};






//---------------------------------------------------------------------------------------------------------------------
//																							Project Creation Utilities
//---------------------------------------------------------------------------------------------------------------------

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






//---------------------------------------------------------------------------------------------------------------------
//																							Approval String Utilities
//---------------------------------------------------------------------------------------------------------------------

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

