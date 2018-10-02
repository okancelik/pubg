import * as actionTypes from '../actions/actionTypes';

const initialState = {
	username: null,
	userID: null,
	matches: [],
	error: null,
}

const reducer = (state = initialState, actions) => {

	switch (actions.type) {
		case actionTypes.SAVE_MATCH:
			return {
				...state,
				matches: state.matches.concat(actions.matchData)
			}
		case actionTypes.SAVE_MATCHES_ERROR:
			return {
				...state,
				error: actions.error
			}
		case actionTypes.CLOSE_SEARCH_ERROR:
			return {
				...state,
				error: null,
			}
		case actionTypes.SAVE_USER:
			return {
				...state,
				username: actions.username,
				userID: actions.userID,
				matches: [],
			}
		default:
			return state;

	}

}

export default reducer;