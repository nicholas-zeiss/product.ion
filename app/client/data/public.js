/**
 *
 *	Various sets of data	
 *
**/


export const categoryToGlcode = {
	Production: {
		'Producer': 560260,
		'Associate Producer': 560260,
		'Production Assistant': 560230,
		'Set PA': 560230,
		'Intern': 47816,
		'Director': 560270,
		'Writer': 560100,
		'Meals/Crafty': 590200,
		'On-Camera Talent': 560250
	},

	'Hair, Make-Up, Wardrobe': {
		'Hair Stylist': 560350,
		'Make-Up Artist': 560350,
		'Wardrobe Stylist': 560350,
		'Wardrobe Allowance': 560350
	},

	'Technical Crew': {
		'Director of Photography': 560220,
		'Camera Operator': 560220,
		'Camera Assistant': 560230,
		'Audio Operator': 560210,
		'Set Photographer': 560450
	},

	Equipment: {
		'Camera Rental': 570100,
		'Lighting Rental': 570100,
		'Misc Equipment Rental': 570100,
		'Props': 545100,
		'Set Design': 570150
	},

	Locations: {
		'Location/Fees/Permits': 570150,
		'Location Manager': 570150,
		'Taxis & Local Transport': 590500,
		'Airfare': 590400,
		'Hotel': 590300,
		'Car Rental': 590400,
		'Gas/Tolls/Parking': 590600
	},

	'Post-Production': {
		'Editor': 560240,
		'Assistant Editor': 560240,
		'Color Correction': 15250,
		'Edit Suite': 560240,
		'Audio Mixing': 515250,
		'Transcription': 515250,
		'Deisgn & Motion GFX': 660400,
		'Misc Post': 515250
	},

	Misc: {
		'Consultant': 580200,
		'Research Materials': 545010,
		'Photo Licensing': 564000,
		'Footage Licensing': 570200,
		'Music Licensing': 570200,
		'Insurance': 570200,
		'Hosting Service': 500950,
		'Third Party Production': 560275,
		'Third Party Licensing': 560280
	}
};


const glCodeToCategory = {};

for (let cat in categoryToGlcode) {
	for (let expense in categoryToGlcode[cat]) {
		let glCode = categoryToGlcode[cat][expense];
		glCodeToCategory[glCode] = cat;
	}
}

export { glCodeToCategory };


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

