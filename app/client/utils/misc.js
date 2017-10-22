/**
 *
 *	Miscellaneous utilities
 *
**/


// returns a string of the current date in YYYY-MM-DD format
export const currDateString = () => {
	let now = new Date();
	
	let mm = ('0' + (now.getMonth() + 1)).slice(-2);
	let dd = ('0' + now.getDate()).slice(-2);

	return [ now.getFullYear(), mm, dd ].join('-');
};


// convert from YYYY-MM-DD to mm/dd/yy
export const formatDate = date => {
	let [ year, month, day ] = date.split('-');

	// remove padding
	month = '' + Number(month);
	day = '' + Number(day);

	return [ month, day, year.slice(-2) ].join('/');
};


export const moneyString = val => {
	return '$' + val;
};

