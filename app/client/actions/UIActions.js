/**
 *
 *	Action creators that effect the  section of the store
 *
**/


import { browserHistory } from 'react-router';


export const clearUI = () => ({ type: 'CLEAR_UI' });


export const closePitchModal = () => ({ type: 'CLOSE_PITCH_MODAL' });


export const setMessages = messages => ({
	type: 'SET_MESSAGES',
	messages
});


export const setProject = projID => ({
	type: 'SET_PROJECT',
	projID
});


export const toggleCharts = () => ({ type: 'TOGGLE_CHARTS' });


export const viewExpenses = projID => (
	dispatch => {
		dispatch({ type: 'SET_PROJECT', projID });
		browserHistory.push('/expenses');
	}
);


export const viewPitchModal = projID => ({ type: 'VIEW_PITCH_MODAL', projID });

