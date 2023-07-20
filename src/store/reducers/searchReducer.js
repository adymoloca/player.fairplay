import {
    GET_PLAYER_USERNAME_REQUEST,
    GET_PLAYER_USERNAME_SUCCESS,
    GET_PLAYER_USERNAME_FAILURE,
    GET_FIELDS_SEARCH_REQUEST,
    GET_FIELDS_SEARCH_SUCCESS,
    GET_FIELDS_SEARCH_FAILURE,
    CLEAR_ERROR,
    GET_MATCHES_SEARCH_REQUEST,
    GET_MATCHES_SEARCH_SUCCESS,
    GET_MATCHES_SEARCH_FAILURE,
    CLEAR_SEARCHED_FIELDS,
    CLEAR_SEARCHED_PLAYERS,
    GET_PLAYER_MATCH_REQUEST,
    GET_PLAYER_MATCH_SUCCESS,
    GET_PLAYER_MATCH_FAILURE,
} from 'store/types/searchTypes';

const initialState = {
    loading: false,
    error: {
        status: false,
        message: "",
    },
    playerUsername: [],
    searchedFields: [],
    searchMatches: [],
};

const searchReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PLAYER_USERNAME_REQUEST:
            return {
                ...state,
                loading: true,
                error: {
                    status: false,
                  },
            };
        case GET_PLAYER_USERNAME_SUCCESS:
            return {
                ...state,
                loading: false,
                playerUsername: action?.payload?.players,
                error: {
                    status: false,
                  },
            };
        case GET_PLAYER_USERNAME_FAILURE:
            return {
                ...state,
                loading: false,
                playerUsername: [],
                error: {
                    status: true,
                  },
            };
        case GET_FIELDS_SEARCH_REQUEST:
            return {
                ...state,
                loading: true,
                error: {
                    status: false,
                  },
            };
        case GET_FIELDS_SEARCH_SUCCESS:
            return {
                ...state,
                loading: false,
                searchedFields: action?.payload?.fields,
                error: {
                    status: false,
                  },
            };
        case GET_FIELDS_SEARCH_FAILURE:
            return {
                ...state,
                loading: false,
                searchedFields: [],
                error: {
                    status: true,
                  },
            };
        case GET_MATCHES_SEARCH_REQUEST:
            return {
                ...state,
                loading: true,
                error: {
                    status: false,
                  },
            };
        case GET_MATCHES_SEARCH_SUCCESS:
            return {
                ...state,
                loading: false,
                searchMatches: action?.payload?.matches,
                error: {
                    status: false,
                  },
            };
        case GET_MATCHES_SEARCH_FAILURE:
            return {
                ...state,
                loading: false,
                searchMatches: [],
                error: {
                    status: true,
                  },
            };
        case GET_PLAYER_MATCH_REQUEST:
            return {
                ...state,
                loading: true,
                error: {
                    status: false,
                },
            };
        case GET_PLAYER_MATCH_SUCCESS:
            return {
                ...state,
                loading: false,
                playerUsername: action?.payload?.players,
                error: {
                    status: false,
                },
            };
        case GET_PLAYER_MATCH_FAILURE:
            return {
                ...state,
                loading: false,
                playerUsername: [],
                error: {
                    status: true,
                },
            };
        case CLEAR_SEARCHED_FIELDS:
            return {
                ...state,
                searchedFields: [],
            };
        case CLEAR_SEARCHED_PLAYERS:
            return {
                ...state,
                playerUsername: [],
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

export default searchReducer;