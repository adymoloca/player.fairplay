//types
export const GET_MATCHES_REQUEST = 'GET_MATCHES_REQUEST';
export const GET_MATCHES_SUCCESS = 'GET_MATCHES_SUCCESS';
export const GET_MATCHES_FAILURE = 'GET_MATCHES_FAILURE';

export const GET_MATCH_REQUEST = 'GET_MATCH_REQUEST';
export const GET_MATCH_SUCCESS = 'GET_MATCH_SUCCESS';
export const GET_MATCH_FAILURE = 'GET_MATCH_FAILURE';

export const GET_NEAR_MATCHES_REQUEST = 'GET_NEAR_MATCHES_REQUEST';
export const GET_NEAR_MATCHES_SUCCESS = 'GET_NEAR_MATCHES_SUCCESS';
export const GET_NEAR_MATCHES_FAILURE = 'GET_NEAR_MATCHES_FAILURE';

export const PATCH_MATCH_REQUEST = 'PATCH_MATCH_REQUEST';
export const PATCH_MATCH_SUCCESS = 'PATCH_MATCH_SUCCESS';
export const PATCH_MATCH_FAILURE = 'PATCH_MATCH_FAILURE';

export const PATCH_CHOOSE_TEAM_REQUEST = 'PATCH_CHOOSE_TEAM_REQUEST';
export const PATCH_CHOOSE_TEAM_SUCCESS = 'PATCH_CHOOSE_TEAM_SUCCESS';
export const PATCH_CHOOSE_TEAM_FAILURE = 'PATCH_CHOOSE_TEAM_FAILURE';

export const EXIT_MATCH_REQUEST = 'EXIT_MATCH_REQUEST';
export const EXIT_MATCH_SUCCESS = 'EXIT_MATCH_SUCCESS';
export const EXIT_MATCH_FAILURE = 'EXIT_MATCH_FAILURE';

export const ACCEPT_MATCH_REQUEST_REQUEST = 'ACCEPT_MATCH_REQUEST_REQUEST';
export const ACCEPT_MATCH_REQUEST_SUCCESS = 'ACCEPT_MATCH_REQUEST_SUCCESS';
export const ACCEPT_MATCH_REQUEST_FAILURE = 'ACCEPT_MATCH_REQUEST_FAILURE';

export const DECLINE_MATCH_REQUEST_REQUEST = 'DECLINE_MATCH_REQUEST_REQUEST';
export const DECLINE_MATCH_REQUEST_SUCCESS = 'DECLINE_MATCH_REQUEST_SUCCESS';
export const DECLINE_MATCH_REQUEST_FAILURE = 'DECLINE_MATCH_REQUEST_FAILURE';

export const DELETE_MATCH_REQUEST = 'DELETE_MATCH_REQUEST';
export const DELETE_MATCH_SUCCESS = 'DELETE_MATCH_SUCCESS';
export const DELETE_MATCH_FAILURE = 'DELETE_MATCH_FAILURE';

export const CANCEL_JOIN_REQUEST = 'CANCEL_JOIN_REQUEST';
export const CANCEL_JOIN_SUCCESS = 'CANCEL_JOIN_SUCCESS';
export const CANCEL_JOIN_FAILURE = 'CANCEL_JOIN_FAILURE';

export const GET_UPCOMING_MATCHES_REQUEST = 'GET_UPCOMING_MATCHES_REQUEST';
export const GET_UPCOMING_MATCHES_SUCCESS = 'GET_UPCOMING_MATCHES_SUCCESS';
export const GET_UPCOMING_MATCHES_FAILURE = 'GET_UPCOMING_MATCHES_FAILURE';

export const CLEAR_MATCHES = 'CLEAR_MATCHES';
export const CLEAR_NEAR_MATCHES = 'CLEAR_NEAR_MATCHES';

export const CLEAR_ERROR = 'CLEAR_ERROR';

//actions
export const getMatchesRequest = () => {
    return {
        type: GET_MATCHES_REQUEST
    }
}

export const getMatchesSuccess = (payload) => {
    return {
        type: GET_MATCHES_SUCCESS,
        payload: payload
    }
}

export const getMatchesFailure = (payload) => {
    return {
        type: GET_MATCHES_FAILURE,
        payload: payload
    }
}

export const getMatchRequest = () => {
    return {
        type: GET_MATCH_REQUEST
    }
}

export const getMatchSuccess = (payload) => {
    return {
        type: GET_MATCH_SUCCESS,
        payload: payload
    }
}

export const getMatchFailure = (payload) => {
    return {
        type: GET_MATCH_FAILURE,
        payload: payload
    }
}

export const updateMatchRequest = () => {
    return {
        type: PATCH_MATCH_REQUEST
    }
}

export const updateMatchSuccess = (payload) => {
    return {
        type: PATCH_MATCH_SUCCESS,
        payload: payload
    }
}

export const updateMatchFailure = (payload) => {
    return {
        type: PATCH_MATCH_FAILURE,
        payload: payload
    }
}

export const chooseTeamRequest = () => {
    return {
        type: PATCH_CHOOSE_TEAM_REQUEST
    }
}

export const chooseTeamSuccess = (payload) => {
    return {
        type: PATCH_CHOOSE_TEAM_SUCCESS,
        payload: payload
    }
}

export const chooseTeamFailure = (payload) => {
    return {
        type: PATCH_CHOOSE_TEAM_FAILURE,
        payload: payload
    }
}

export const getNearMatchesRequest = () => {
    return {
        type: GET_NEAR_MATCHES_REQUEST
    }
}

export const getNearMatchesSuccess = (payload) => {
    return {
        type: GET_NEAR_MATCHES_SUCCESS,
        payload: payload
    }
}

export const getNearMatchesFailure = (payload) => {
    return {
        type: GET_NEAR_MATCHES_FAILURE,
        payload: payload
    }
}
export const clearMatches = () => {
    return {
        type: CLEAR_MATCHES
    }
}
export const clearNearMatches = () => {
    return {
        type: CLEAR_NEAR_MATCHES,
        
    }
}

export const clearErrorMatches = () => {
    return {
        type: CLEAR_ERROR
    }
}

// *************************| EXIT MATCH |**************************

export const exitMatchRequest = (payload) => {
    return {
        type: EXIT_MATCH_REQUEST,
        payload: payload
    }
}

export const exitMatchSuccess = (payload) => {
    return {
        type: EXIT_MATCH_SUCCESS,
        payload: payload
    }
}

export const exitMatchFailure = (payload) => {
    return {
        type: EXIT_MATCH_FAILURE,
        payload: payload
    }
}

// *************************| ACCEPT MATCH REQUEST |**************************

export const acceptMatchRequestRequest = (payload) => {
    return {
        type: ACCEPT_MATCH_REQUEST_REQUEST,
        payload: payload
    }
}

export const acceptMatchRequestSuccess = (payload) => {
    return {
        type: ACCEPT_MATCH_REQUEST_SUCCESS,
        payload: payload
    }
}

export const acceptMatchRequestFailure = (payload) => {
    return {
        type: ACCEPT_MATCH_REQUEST_FAILURE,
        payload: payload
    }
}

// *************************| DECLINE MATCH REQUEST |**************************

export const declineMatchRequestRequest = (payload) => {
    return {
        type: DECLINE_MATCH_REQUEST_REQUEST,
        payload: payload
    }
}

export const declineMatchRequestSuccess = (payload) => {
    return {
        type: DECLINE_MATCH_REQUEST_SUCCESS,
        payload: payload
    }
}

export const declineMatchRequestFailure = (payload) => {
    return {
        type: DECLINE_MATCH_REQUEST_FAILURE,
        payload: payload
    }
}

// *************************| DELETE MATCH |**************************

export const deleteMatchRequest = (payload) => {
    return {
        type: DELETE_MATCH_REQUEST,
        payload: payload
    }
}

export const deleteMatchSuccess = (payload) => {
    return {
        type: DELETE_MATCH_SUCCESS,
        payload: payload
    }
}

export const deleteMatchFailure = (payload) => {
    return {
        type: DELETE_MATCH_FAILURE,
        payload: payload
    }
}

// *************************| CANCEL MATCH |**************************

export const cancelJoinRequest = (payload) => {
    return {
        type: CANCEL_JOIN_REQUEST,
        payload: payload
    }
}

export const cancelJoinSuccess = (payload) => {
    return {
        type: CANCEL_JOIN_SUCCESS,
        payload: payload
    }
}

export const cancelJoinFailure = (payload) => {
    return {
        type: CANCEL_JOIN_FAILURE,
        payload: payload
    }
}

// *************************| UPCOMING MATCHES |**************************

export const getUpcomingMatchesRequest = () => {
    return {
        type: GET_UPCOMING_MATCHES_REQUEST
    }
}

export const getUpcomingMatchesSuccess = (payload) => {
    return {
        type: GET_UPCOMING_MATCHES_SUCCESS,
        payload: payload
    }
}

export const getUpcomingMatchesFailure = (payload) => {
    return {
        type: GET_UPCOMING_MATCHES_FAILURE,
        payload: payload
    }
}
