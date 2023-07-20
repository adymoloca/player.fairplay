import {
	LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE,
	REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE,
	UPDATE_PLAYER_REQUEST, UPDATE_PLAYER_SUCCESS, UPDATE_PLAYER_FAILURE,
	ACTIVATE_REQUEST, ACTIVATE_SUCCESS, ACTIVATE_FAILURE,
	RESET_ACTIVATE_REQUEST, RESET_ACTIVATE_SUCCESS, RESET_ACTIVATE_FAILURE,
	REFRESH_TOKEN_FAILURE, REFRESH_TOKEN_SUCCESS, REFRESH_TOKEN_REQUEST,
	CLEAR_ERROR,
	LOGOUT,
	UPDATE_HOURS_REQUEST,
} from "store/types/userTypes";

const initialState = {
	loading: false,
	error: {
		status: false,
		message: "",
	},
	player: {},
	isActivated: true,
	token: "",
	refreshToken: "",
};

const playerReducer = (state = initialState, action) => {
	switch (action.type) {
		case LOGIN_REQUEST:
			return {
				...state,
				loading: true,
			};
		case LOGIN_SUCCESS:
			return {
				...state,
				loading: false,
				error: {
					status: false,
					message: action?.payload?.message,
				},
				player: action?.payload?.player,
				token: action?.payload?.accessToken,
				refreshToken: action?.payload?.refreshToken,
			};
		case LOGIN_FAILURE:
			return {
				...state,
				loading: false,
				error: {
					status: true,
					message: action?.payload?.error,
				},
				isActivated: action?.payload?.isActivated,
			};
		case REGISTER_REQUEST:
			return {
				...state,
				loading: true,
			};
		case REGISTER_SUCCESS:
			return {
				...state,
				loading: false,
				error: {
					status: false,
					message: action?.payload?.message,
				},
			};
		case REGISTER_FAILURE:
			return {
				...state,
				loading: false,
				error: {
					status: true,
					message: action?.payload?.error,
				},
			};
		case ACTIVATE_REQUEST:
			return {
				...state,
				loading: true,
			};
		case ACTIVATE_SUCCESS:
			return {
				...state,
				loading: false,
				error: {
					status: false,
					message: action?.payload?.message,
				},
				player: action?.payload?.player,
				token: action?.payload?.accessToken,
				refreshToken: action?.payload?.refreshToken,
			};
		case ACTIVATE_FAILURE:
			return {
				...state,
				loading: false,
				error: {
					status: true,
					message: action?.payload?.error,
				}
			};
		case RESET_ACTIVATE_REQUEST:
			return {
				...state,
				loading: true,
			};
		case RESET_ACTIVATE_SUCCESS:
			return {
				...state,
				loading: false,
				error: {
					status: false,
					message: action?.payload?.message,
				},
			};
		case RESET_ACTIVATE_FAILURE:
			return {
				...state,
				loading: false,
				error: {
					status: true,
					message: action?.payload?.error,
				},
			};
		case UPDATE_PLAYER_REQUEST:
			return {
				...state,
				loading: true,
			};
		case UPDATE_PLAYER_SUCCESS:
			return {
				...state,
				loading: false,
				error: {
					status: false,
					message: action?.payload?.message,
				},
				player: action?.payload?.player,
				token: action?.payload?.accessToken,
				refreshToken: action?.payload?.refreshToken,
			};
		case UPDATE_PLAYER_FAILURE:
			return {
				...state,
				loading: false,
				error: {
					status: true,
					message: action?.payload?.error,
				},
			};
		case REFRESH_TOKEN_REQUEST:
			return {
				...state,
				loading: true,
			};
		case REFRESH_TOKEN_SUCCESS:
			return {
				...state,
				loading: false,
				error: {
					status: false,
					message: action?.payload?.message,
				},
				token: action?.payload?.accessToken,
				refreshToken: action?.payload?.refreshToken,
			};
		case REFRESH_TOKEN_FAILURE:
			return {
				...state,
				loading: false,
				error: {
					status: true,
					message: action?.payload?.error,
				},
			};
		case UPDATE_HOURS_REQUEST :
			return {
				...state,
				player:{
					...state?.player,
					gameplayHours: action?.payload
				}
			};
		case CLEAR_ERROR:
			return {
				...state,
				error: { ...initialState.error },
			};
		case LOGOUT:
			return {
				...initialState,
			};
		default:
			return state;
	}
};

export default playerReducer;
