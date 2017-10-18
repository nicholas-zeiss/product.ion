/**
 *
 *	Reducers for the project being edited section of our store
 *
**/


export const defaultEditProjectState = Object.freeze({ 
	budgets: null,
	expenses: null,
	project: null 
});


export default (state = defaultBudgetsState, action) => {

	switch (action.type) {
		
		

		default: {
			return state;
		}
	}
};

