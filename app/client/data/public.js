/**
 *
 *	Sets of various options for budgets/expenses/projects
 *
**/


// just so we can export jsx
import React from 'react';
import { MenuItem } from 'react-bootstrap';


const categoryToGlCode = {
	Production: {
		'Producer': 560260,
		'Associate Producer': 560261,
		'Production Assistant': 560262,
		'Set PA': 560263,
		'Intern': 560264,
		'Director': 560265,
		'Writer': 560266,
		'Meals/Crafty': 560267,
		'On-Camera Talent': 560268
	},

	'Hair, Make-Up, Wardrobe': {
		'Hair Stylist': 560350,
		'Make-Up Artist': 560351,
		'Wardrobe Stylist': 560352,
		'Wardrobe Allowance': 560353
	},

	'Technical Crew': {
		'Director of Photography': 560220,
		'Camera Operator': 560221,
		'Camera Assistant': 560222,
		'Audio Operator': 560223,
		'Set Photographer': 560224
	},

	Equipment: {
		'Camera Rental': 570100,
		'Lighting Rental': 570101,
		'Misc Equipment Rental': 570102,
		'Props': 570103,
		'Set Design': 570104
	},

	Locations: {
		'Location/Fees/Permits': 570150,
		'Location Manager': 570151,
		'Taxis & Local Transport': 570152,
		'Airfare': 570153,
		'Hotel': 570154,
		'Car Rental': 570155,
		'Gas/Tolls/Parking': 570156
	},

	'Post-Production': {
		'Editor': 560240,
		'Assistant Editor': 560241,
		'Color Correction': 560242,
		'Edit Suite': 560243,
		'Audio Mixing': 560244,
		'Transcription': 560245,
		'Deisgn & Motion GFX': 560246,
		'Misc Post': 560247
	},

	Misc: {
		'Consultant': 580200,
		'Research Materials': 580201,
		'Photo Licensing': 580202,
		'Footage Licensing': 580203,
		'Music Licensing': 580204,
		'Insurance': 580205,
		'Hosting Service': 580206,
		'Third Party Production': 580207,
		'Third Party Licensing': 580208
	}
};


const glCodeToExpense = {};

for (let cat in categoryToGlCode) {
	for (let expense in categoryToGlCode[cat]) {
		glCodeToExpense[categoryToGlCode[cat][expense]] = expense;
	}
}

export { categoryToGlCode, glCodeToExpense };


export const dropDownOptions = () => {
	let items = [];

	Object
		.keys(categoryToGlCode)
		.forEach((category) => {
			items.push(<MenuItem key={ category } header>{ category }</MenuItem>);

			Object
				.keys(categoryToGlCode[category])
				.forEach(type => {
					items.push(<MenuItem eventKey={ type + '---' + category } key={ type }>{ type }</MenuItem>);
				});
		});

	return items;
};

