export default (
	state = {
		components: [],		
		selectedComponent: null,
		view: 'docs'
	},
	action = {}
) => {
	switch(action.type) {

		case 'INIT_COMPONENTS': {
			return {
				...state,
				components: Object.keys(action.payload).map(k => {
					const {example, props, name, components} = action.payload[k];

					return {example, props, name, components};
				})
			};
		}

		case 'UPDATE_EDITOR': {
			return {
				...state,
				selectedComponent: {
					...state.selectedComponent,
					sandbox: action.payload
				}
			};
		}

		case 'SELECT_COMPONENT': {
			const selected = state.components.find(c => c.name === action.payload);

			if(!selected) {
				console.error(`Could not find ${action.payload} in`, state.components);				
				return state;
			}

			const execCode = selected.example.replace(
      			/(^|\n)import\s+[A-Za-z0-9_\{\}\s,]+\s+from\s+('|").*?('|");?/g,
      			''
      		).trim();

			return {
				...state,
				selectedComponent: {
					...selected,
					execCode,
					sandbox: execCode
				}
			};
		}

		case 'UPDATE_VIEW': {
			if(['docs', 'code'].indexOf(action.payload) === -1) {
				throw new Error('UPDATE_VIEW must be "docs" or "code"');
			}

			return {
				...state,
				view: action.payload
			};
		}

		default:
			return state;
	}

};