
const documentReducer = (state=[], action) => {
	switch (action.type) {
		case 'ADD_DOC_SUCCESS':
			let newState = [...state, Object.assign({}, action.document)];
			console.log(JSON.stringify(newState));
			return newState;
			break;
		default:
			return state;
	}
};


const pendingDocumentReducer  = (state=[], action) => {
	let newState;
	switch (action.type) {
		case 'ADD_DOC_START_MOCK':
		case 'ADD_DOC_START':
			newState = [...state, Object.assign({}, action.document)];
			console.log(JSON.stringify(newState));
			return newState;
			break;
		case 'ADD_DOC_SUCCESS':
			newState = [];
			for(let i=0; i<state.length; i++) {
				if(state[i].title == action['document'].title) {
					if(state[i].body == action['document'].body) {
						continue;
					}
				}
				newState.push(state[i]);
			}
			return newState;
			break;
		default:
			return state;
	}
};

export {documentReducer, pendingDocumentReducer};
