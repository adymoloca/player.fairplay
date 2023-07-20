import {
	GET_MATCHES_REQUEST, GET_MATCHES_SUCCESS, GET_MATCHES_FAILURE,
	GET_MATCH_REQUEST, GET_MATCH_SUCCESS, GET_MATCH_FAILURE,
	GET_NEAR_MATCHES_REQUEST, GET_NEAR_MATCHES_SUCCESS, GET_NEAR_MATCHES_FAILURE,
	PATCH_MATCH_REQUEST, PATCH_MATCH_SUCCESS, PATCH_MATCH_FAILURE,
	PATCH_CHOOSE_TEAM_REQUEST, PATCH_CHOOSE_TEAM_SUCCESS, PATCH_CHOOSE_TEAM_FAILURE,
	EXIT_MATCH_REQUEST, EXIT_MATCH_SUCCESS, EXIT_MATCH_FAILURE,
	ACCEPT_MATCH_REQUEST_REQUEST, ACCEPT_MATCH_REQUEST_SUCCESS, ACCEPT_MATCH_REQUEST_FAILURE, 
	DECLINE_MATCH_REQUEST_REQUEST, DECLINE_MATCH_REQUEST_SUCCESS, DECLINE_MATCH_REQUEST_FAILURE,
	DELETE_MATCH_REQUEST, DELETE_MATCH_SUCCESS, DELETE_MATCH_FAILURE,
	CANCEL_JOIN_SUCCESS, CANCEL_JOIN_FAILURE, CANCEL_JOIN_REQUEST,
	GET_UPCOMING_MATCHES_REQUEST, GET_UPCOMING_MATCHES_SUCCESS, GET_UPCOMING_MATCHES_FAILURE,
	CLEAR_ERROR,
} from '../types/matchesTypes.js';

const initialState = {
	loading: false,
	loadingExit: false,
	loadingNear : false,
	loadingUpcoming : false,
	loadingJoinTeam: false,
	error: {
		status: false,
		message: '',
	},
	matches: [],
	nearMatches: [],
	match: {},
	joinedStatus: [],
	upcoming: []
};

const matchesReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_MATCHES_REQUEST:
			return {
				...state,
				loading: true,
				error: {
					status: false,
				  },
			};
		case GET_MATCHES_SUCCESS:
			return {
				...state,
				loading: false,
				matches: action?.payload?.matches,
				error: {
					status: false,
				  },
			};
		case GET_MATCHES_FAILURE:
			return {
				...state,
				loading: false,
				error: {
					status: true,
				  },
			};

		//MATCH

		case GET_MATCH_REQUEST:
			return {
				...state,
				loading: true,
				error: {
					status: false,
				  },
			};
		case GET_MATCH_SUCCESS:
			return {
				...state,
				loading: false,
				match: action?.payload?.match,
				error: {
					status: false,
				  },
				joinedStatus: action?.payload?.joinedStatus
			};
		case GET_MATCH_FAILURE:
			return {
				...state,
				loading: false,
				error: {
					status: true,
				  },
				match: {},
				status: []
			};

		// Near Matches

		case GET_NEAR_MATCHES_REQUEST:
			return {
				...state,
				loadingNear: true,
				error: {
					status: false,
				  },
			};
		case GET_NEAR_MATCHES_SUCCESS:
			return {
				...state,
				loadingNear: false,
				error: {
					status: false,
				},
				nearMatches: action?.payload?.nearbyMatches,
			};
		case GET_NEAR_MATCHES_FAILURE:
			return {
				...state,
				loadingNear: false,
				error: {
					status: true,
				  },
			};
		case PATCH_MATCH_REQUEST:
			return {
				...state,
				loading: true,
			};
		case PATCH_MATCH_SUCCESS:
			return {
				loading: false,
				error: {
					status: false,
					message: action?.payload?.message,
				},
			};
		case PATCH_MATCH_FAILURE:
			return {
				loading: false,
				error: {
					status: true,
					message: action?.payload?.message,
				},
			};

		// CHOOSE TEAM	
		case PATCH_CHOOSE_TEAM_REQUEST:
			return {
				...state,
				loadingJoinTeam: true,
			};
		case PATCH_CHOOSE_TEAM_SUCCESS:
			return {
				loadingJoinTeam: false,
				error: {
					status: false,
					message: action?.payload?.message,
				},
				match: {
					...state?.match,
					teams: action?.payload?.teams,
					spots: action?.payload?.spots
				},
				joinedStatus: action?.payload?.joinedStatus,
			};
		case PATCH_CHOOSE_TEAM_FAILURE:
			return {
				loadingJoinTeam: false,
				error: {
					status: true,
					message: action?.payload?.message,
				},
			};

		// EXIT MATCH
		case EXIT_MATCH_REQUEST:
			return {
				...state,
				loadingExit: true,
			};
		case EXIT_MATCH_SUCCESS:
			return {
				loadingExit: false,
				error: {
					status: false,
					message: action?.payload?.message,
				},
			};
		case EXIT_MATCH_FAILURE:
			return {
				loadingExit: false,
				error: {
					status: true,
					message: action?.payload?.message,
				},
			};

		// ACCEPT MATCH REQUEST
		case ACCEPT_MATCH_REQUEST_REQUEST:
			return {
				...state,
				loadingExit: true,
			};
		case ACCEPT_MATCH_REQUEST_SUCCESS:
			return {
				loadingExit: false,
				error: {
					status: false,
					message: action?.payload?.message,
				},
				match: {
					...state?.match,
					pendingPlayers: action?.payload?.match?.pendingPlayers,
					acceptedPlayers: action?.payload?.match?.acceptedPlayers
				},
			};
		case ACCEPT_MATCH_REQUEST_FAILURE:
			return {
				loadingExit: false,
				error: {
					status: true,
					message: action?.payload?.message,
				},
			};

		
		// DECLINE MATCH REQUEST
		case DECLINE_MATCH_REQUEST_REQUEST:
			return {
				...state,
				loadingExit: true,
			};
		case DECLINE_MATCH_REQUEST_SUCCESS:
			return {
				loadingExit: false,
				error: {
					status: false,
					message: action?.payload?.message,
				},
				match: {
					...state?.match,
					pendingPlayers: action?.payload?.match?.pendingPlayers,
					acceptedPlayers: action?.payload?.match?.acceptedPlayers,
					invitedPlayers: action?.payload?.match?.invitedPlayers,
				},
			};
		case DECLINE_MATCH_REQUEST_FAILURE:
			return {
				loadingExit: false,
				error: {
					status: true,
					message: action?.payload?.message,
				},
			};
		// DELETE MATCH
		case DELETE_MATCH_REQUEST:
			return {
				...state,
				loading: true,
			};
		case DELETE_MATCH_SUCCESS:
			return {
				loading: false,
				error: {
					status: false,
					message: action?.payload?.message,
				},
				match: {}
			};
		case DELETE_MATCH_FAILURE:
			return {
				loading: false,
				error: {
					status: true,
					message: action?.payload?.error,
				},
			};
		// CANCEL MATCH
		case CANCEL_JOIN_REQUEST:
			return {
				...state,
				loading: true,
			};
		case CANCEL_JOIN_SUCCESS:
			return {
				loading: false,
				error: {
					status: false,
					message: action?.payload?.message
				},
				upcoming: state?.upcoming
			};
		case CANCEL_JOIN_FAILURE:
			return {
				loading: false,
				error: {
					status: true,
					message: action?.payload?.error,
				},
				upcoming: state?.upcoming
			};

		// upcoming matches

		case GET_UPCOMING_MATCHES_REQUEST:
			return {
				...state,
				loadingUpcoming: true,
				error: {
					status: false,
				  },
			};
		case GET_UPCOMING_MATCHES_SUCCESS:
			return {
				...state,
				loadingUpcoming: false,
				upcoming: action?.payload?.upcomingMatches,
				error: {
					status: false,
				  },
			};
		case GET_UPCOMING_MATCHES_FAILURE:
			return {
				...state,
				loadingUpcoming: false,
				error: {
					status: true,
				  },
			};
		case CLEAR_ERROR:
			return {
				...state,
				error: { ...initialState.error },
			};
		default:
			return state;
	}
};

export default matchesReducer;
