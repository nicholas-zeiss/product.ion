/**
 *
 *	Action creators that effect the  section of the store
 *
**/


export const clearUI = () => ({ type: 'CLEAR_UI' });


export const closePitchModal = () => ({ type: 'CLOSE_PITCH_MODAL' });


export const setMessages = messages => ({ type: 'SET_MESSAGES', messages });


export const toggleCharts = () => ({ type: 'TOGGLE_CHARTS' });


export const viewPitchModal = () => ({ type: 'VIEW_PITCH_MODAL' });

