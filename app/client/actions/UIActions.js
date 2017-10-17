/**
 *
 *	Action creators that effect the  section of the store
 *
**/


export const clearUI = () => ({ type: 'CLEAR_UI' });


export const setMessages = messages => ({
	type: 'SET_MESSAGES',
	messages
});


export const toggleModal = (name, projID = null) => ({
	type: 'TOGGLE_MODAL',
	name,
	projID
});

