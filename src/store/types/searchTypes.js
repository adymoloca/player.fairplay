// types
export const GET_PLAYER_USERNAME_REQUEST = 'GET_PLAYER_USERNAME_REQUEST';
export const GET_PLAYER_USERNAME_SUCCESS = 'GET_PLAYER_USERNAME_SUCCESS';
export const GET_PLAYER_USERNAME_FAILURE = 'GET_PLAYER_USERNAME_FAILURE';

export const GET_FIELDS_SEARCH_REQUEST = 'GET_FIELDS_SEARCH_REQUEST';
export const GET_FIELDS_SEARCH_SUCCESS = 'GET_FIELDS_SEARCH_SUCCESS';
export const GET_FIELDS_SEARCH_FAILURE = 'GET_FIELDS_SEARCH_FAILURE';

export const GET_MATCHES_SEARCH_REQUEST = 'GET_MATCHES_SEARCH_REQUEST';
export const GET_MATCHES_SEARCH_SUCCESS = 'GET_MATCHES_SEARCH_SUCCESS';
export const GET_MATCHES_SEARCH_FAILURE = 'GET_MATCHES_SEARCH_FAILURE';

export const CLEAR_ERROR = 'CLEAR_ERROR';
export const CLEAR_SEARCHED_FIELDS = 'CLEAR_SEARCHED_FIELDS';
export const CLEAR_SEARCHED_PLAYERS = 'CLEAR_SEARCHED_PLAYERS';

export const GET_PLAYER_MATCH_REQUEST = 'GET_PLAYER_MATCH_REQUEST';
export const GET_PLAYER_MATCH_SUCCESS = 'GET_PLAYER_MATCH_SUCCESS';
export const GET_PLAYER_MATCH_FAILURE = 'GET_PLAYER_MATCH_FAILURE';

// actions

export const getPlayerUsernameRequest = () => {
    return {
        type: GET_PLAYER_USERNAME_REQUEST
    }
}

export const getPlayerUsernameSuccess = (payload) => {
    return {
        type: GET_PLAYER_USERNAME_SUCCESS,
        payload: payload
    }
}

export const getPlayerUsernameFailure = (payload) => {
    return {
        type: GET_PLAYER_USERNAME_FAILURE,
        payload: payload
    }
}

// **************************| FIELDS |*******************************

export const getFieldsSearchRequest = () => {
    return {
        type: GET_FIELDS_SEARCH_REQUEST
    }
}

export const getFieldsSearchSuccess = (payload) => {
    return {
        type: GET_FIELDS_SEARCH_SUCCESS,
        payload: payload
    }
}

export const getFieldsSearchFailure = (payload) => {
    return {
        type: GET_FIELDS_SEARCH_FAILURE,
        payload: payload
    }
}

// **************************| MATCHES |*******************************

export const getMatchesSearchRequest = () => {
    return {
        type: GET_MATCHES_SEARCH_REQUEST
    }
}

export const getMatchesSearchSuccess = (payload) => {
    return {
        type: GET_MATCHES_SEARCH_SUCCESS,
        payload: payload
    }
}

export const getMatchesSearchFailure = (payload) => {
    return {
        type: GET_MATCHES_SEARCH_FAILURE,
        payload: payload
    }
}

export const clearErrorSearch = (payload) => {
    return {
        type: CLEAR_ERROR,
        payload: payload
    }
}

export const clearSearchedField = () => {
    return {
        type: CLEAR_SEARCHED_FIELDS,
    }
}

export const clearSearchedPlayers = () => {
    return {
        type: CLEAR_SEARCHED_PLAYERS,
    }
}

// **************************| PLAYER TO INVITE |*******************************

export const getPlayerMatchRequest = (payload) => {
    return {
        type: GET_PLAYER_MATCH_REQUEST,
        payload: payload
    }
}

export const getPlayerMatchSuccess = (payload) => {
    return {
        type: GET_PLAYER_MATCH_SUCCESS,
        payload: payload
    }
}

export const getPlayerMatchFailure = (payload) => {
    return {
        type: GET_PLAYER_MATCH_FAILURE,
        payload: payload
    }
}