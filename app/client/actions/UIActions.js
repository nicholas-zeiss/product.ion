/**
 *
 *	Action creators that affect the user interface section of the store, which holds error messages
 *	and whether or not to render certain views
 *
**/


// reset
export const clearUI = () => ({ type: 'CLEAR_UI' });


// set/unset error message(s)
export const setMessages = messages => ({ type: 'SET_MESSAGES', messages });


export const toggleCSVModal = () => ({ type: 'TOGGLE_CSV_MODAL' });


export const toggleDashCharts = () => ({ type: 'TOGGLE_DASH_CHARTS' });


export const toggleExpenseCharts = () => ({ type: 'TOGGLE_EXPENSE_CHARTS' });


export const toggleLogin = () => ({ type: 'TOGGLE_LOGIN' });


export const togglePitchModal = () => ({ type: 'TOGGLE_PITCH_MODAL' });


export const toggleUserModal = () => ({ type: 'TOGGLE_USER_MODAL' });

