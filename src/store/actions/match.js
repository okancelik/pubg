import * as actionTypes from './actionTypes';
import axios from '../../axios-pubg';

export const getMatchesByUserName = (username) => {
	return dispatch => {
		axios.get("/players?filter[playerNames]=" + username)
			.then(response => {
				if (!response.data.data[0] || !response.data.data[0].relationships.matches.data || response.data.data[0].relationships.matches.data.length < 1) {
					dispatch(getMatchesFail());
				} else {
					dispatch(saveUser(response.data.data[0].attributes.name, response.data.data[0].id));
					const matchIDs = response.data.data[0].relationships.matches.data.slice(0, 50).map(e => {
						return e.id;
					});
					for (let id of matchIDs) {
						axios.get("/matches/" + id)
							.then(matchResponse => {
								const matchData = {
									data: matchResponse.data.data,
									included: matchResponse.data.included,
									players: matchResponse.data.included.filter(include => {
										return include.type === "participant" ? true : false;
									})
								}
								const matchID = matchResponse.data.data.id;
								dispatch(saveMatch(matchID, matchData));
							})
							.catch(e => {
								return null;
							})
					}
				}

			})
			.catch(error => {
				dispatch(getMatchesFail());
			})
	}
}

export const saveMatch = (matchID, matchData) => {
	return {
		type: actionTypes.SAVE_MATCH,
		matchID: matchID,
		matchData: matchData,
	}
}

export const getMatchesFail = () => {
	return {
		type: actionTypes.SAVE_MATCHES_ERROR,
		error: "Kullanıcı bulunamadı."
	}
}

export const closeSearchError = () => {
	return {
		type: actionTypes.CLOSE_SEARCH_ERROR,
	}
}

export const saveUser = (username, userID) => {
	return {
		type: actionTypes.SAVE_USER,
		username: username,
		userID: userID
	}
}