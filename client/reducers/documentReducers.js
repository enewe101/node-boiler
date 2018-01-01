export default (state = [], action) => {
	switch (action.type) {
		case 'CREATE_DOCUMENT':
			let new_state = [...state, Object.assign({}, action.document)];
			console.log(JSON.stringify(new_state));
			return new_state;
		default:
			return state;
	}
};
