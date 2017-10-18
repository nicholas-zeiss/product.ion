/**
 *
 *	As the budget/expense sections of our state are objects where the values are arrays of budget/expense objects
 *	a shallow copy is insufficient to avoid mutating the state. This function returns a deep copy that avoids that pitfall.
 *
**/


export default state => {
	let copy = {};

	for (let key in state) {
		if (state[key] instanceof Array) {
			//key is projID, value is array of budgets/expenses
			copy[key] = state[key].map(budgetExpense => Object.assign({}, budgetExpense));

		} else {
			//key is the loaded property
			copy[key] = state[key];
		}
	}

	return copy;
};




