/**
 *
 *	Utilities for working with project objects
 *
**/


// Generate an empty project
export const projectDefaults = (orgID, userID) => ({
	adminNotes: '',
	approvals: '1111111111',
	editDate: undefined,
	endDate: undefined,
	name: undefined,
	numAssets: undefined,
	orgID: orgID,
	releaseDate: undefined,
	reqBudget: 0,
	startDate: undefined,
	status: 'Pitch',
	tier: undefined,
	type: undefined,
	userID: userID,
	vertical: undefined
});


//order of keys in approval string, used in following two functions
const approvalStringOrder = [
	'endDate',
	'editDate',
	'numAssets',
	'name',
	'releaseDate',
	'reqBudget',
	'startDate',
	'tier',
	'vertical',
	'videoType'
];


// One property of projects is approvals, which represent the approval state
// of other properties for a project while it is still a pitch and not approved for production. Due to
// database limitations, it is stored as a string of 1s and 0s to represent approved/unapproved.
// This converts that into a much more useable form.
export const genApprovalObject = string => {
	let approvalObject = {};

	approvalStringOrder.forEach((key, index) => {
		approvalObject[key] = !!string[index];
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

