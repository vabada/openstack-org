/*eslint-disable */
export const generic_reducers = function (
	state = {
		msg: null,
        msg_type: null,
		params: {}
	}, 
	action = {}) {
		switch(action.type) {
            case 'SHOW_MESSAGE':
				return {
					...state,
					msg: action.payload.msg,
                    msg_type: action.payload.msg_type
				};
			case 'CLEAR_MESSAGE':
				return {
					...state,
					msg: null
				};
			default:
				return state;

		}
};
/*eslint-enable */
