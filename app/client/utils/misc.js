

export const moneyString = val => {
	return '$' + val;
};


// returns a string of the current date in YYYY-MM-DD format
export const currDateString = () => {
	let now = new Date();
	
	let mm = ('0' + now.getMonth()).slice(-2);
	let dd = ('0' + now.getDate()).slice(-2);

	return [ now.getFullYear(), mm, dd ].join('-');
};

