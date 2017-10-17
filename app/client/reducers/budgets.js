/**
 *
 *	Reducers for the budgets section of our store
 *
**/


export const defaultBudgetsState = { loaded: false };


export default (state = defaultBudgetsState, action) => {

	switch (action.type) {
		
		case 'CLEAR_BUDGETS': {
			return defaultBudgetsState;
		}


		case 'DEHYDRATE_BUDGETS': {
			let budgets = Object.assign({}, state);
			action.IDs.forEach(id => delete budgets[id]);

			return budgets;
		}


		case 'HYDRATE_BUDGETS': {
			let newBudgets = Object.assign({}, state, { loaded: true });

			action.budgets.forEach(budget => {
				let id = budget.id;
				delete budget.id;
				newBudgets[id] = budget;
			});

			return newBudgets;
		}


		default: {
			return state;
		}
	}
};

