/**
 *
 *	Action creators that effect the  section of the store
 *
**/


export const clearUI = () => ({ type: 'CLEAR_UI' });


export const setMessages = messages => ({ type: 'SET_MESSAGES', messages });


export const toggleCSVModal = () => ({ type: 'TOGGLE_CSV_MODAL' });


export const toggleDashCharts = () => ({ type: 'TOGGLE_DASH_CHARTS' });


export const toggleExpenseCharts = () => ({ type: 'TOGGLE_EXPENSE_CHARTS' });


export const togglePitchModal = () => ({ type: 'TOGGLE_PITCH_MODAL' });

