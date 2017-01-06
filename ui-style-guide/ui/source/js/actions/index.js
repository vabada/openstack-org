const createAction = type => payload => ({
	type,
	payload
});

export const initComponents = createAction('INIT_COMPONENTS');
export const updateEditor = createAction('UPDATE_EDITOR');
export const selectComponent = createAction('SELECT_COMPONENT');
export const updateView = createAction('UPDATE_VIEW');