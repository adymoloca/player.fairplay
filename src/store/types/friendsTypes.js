//types
export const GET_FRIENDS_REQUEST = 'GET_FRIENDS_REQUEST';
export const GET_FRIENDS_SUCCESS = 'GET_FRIENDS_SUCCESS';
export const GET_FRIENDS_FAILURE = 'GET_FRIENDS_FAILURE';

export const SEND_FRIEND_REQUEST_REQUEST = 'SEND_FRIEND_REQUEST_REQUEST';
export const SEND_FRIEND_REQUEST_SUCCESS = 'SEND_FRIEND_REQUEST_SUCCESS';
export const SEND_FRIEND_REQUEST_FAILURE = 'SEND_FRIEND_REQUEST_FAILURE';

export const GET_FRIEND_REQUEST_REQUEST = 'GET_FRIEND_REQUEST_REQUEST';
export const GET_FRIEND_REQUEST_SUCCESS = 'GET_FRIEND_REQUEST_SUCCESS';
export const GET_FRIEND_REQUEST_FAILURE = 'GET_FRIEND_REQUEST_FAILURE';

export const GET_SENT_REQUEST_REQUEST = 'GET_SENT_REQUEST_REQUEST';
export const GET_SENT_REQUEST_SUCCESS = 'GET_SENT_REQUEST_SUCCESS';
export const GET_SENT_REQUEST_FAILURE = 'GET_SENT_REQUEST_FAILURE';

export const ACCEPT_FRIEND_REQUEST_REQUEST = 'ACCEPT_FRIEND_REQUEST_REQUEST';
export const ACCEPT_FRIEND_REQUEST_SUCCESS = 'ACCEPT_FRIEND_REQUEST_SUCCESS';
export const ACCEPT_FRIEND_REQUEST_FAILURE = 'ACCEPT_FRIEND_REQUEST_FAILURE';

export const REMOVE_FRIEND_REQUEST = 'REMOVE_FRIEND_REQUEST';
export const REMOVE_FRIEND_SUCCESS = 'REMOVE_FRIEND_SUCCESS';
export const REMOVE_FRIEND_FAILURE = 'REMOVE_FRIEND_FAILURE';

export const REVOQUE_REQUEST = 'REVOQUE_REQUEST';
export const REVOQUE_SUCCESS = 'REVOQUE_SUCCESS';
export const REVOQUE_FAILURE = 'REVOQUE_FAILURE';

export const DECLINE_FRIEND_REQUEST = 'DECLINE_FRIEND_REQUEST';
export const DECLINE_FRIEND_SUCCESS = 'DECLINE_FRIEND_SUCCESS';
export const DECLINE_FRIEND_FAILURE = 'DECLINE_FRIEND_FAILURE';

export const GET_FAVORITE_REQUEST = 'GET_FAVORITE_REQUEST';
export const GET_FAVORITE_SUCCESS = 'GET_FAVORITE_SUCCESS';
export const GET_FAVORITE_FAILURE = 'GET_FAVORITE_FAILURE';

export const ADD_FAVORITE_REQUEST = 'ADD_FAVORITE_REQUEST';
export const ADD_FAVORITE_SUCCESS = 'ADD_FAVORITE_SUCCESS';
export const ADD_FAVORITE_FAILURE = 'ADD_FAVORITE_FAILURE';

export const REMOVE_FAVORITE_REQUEST = 'REMOVE_FAVORITE_REQUEST';
export const REMOVE_FAVORITE_SUCCESS = 'REMOVE_FAVORITE_SUCCESS';
export const REMOVE_FAVORITE_FAILURE = 'REMOVE_FAVORITE_FAILURE';

export const GET_FRIEND_REQUEST = 'GET_FRIEND_REQUEST';
export const GET_FRIEND_SUCCESS = 'GET_FRIEND_SUCCESS';
export const GET_FRIEND_FAILURE = 'GET_FRIEND_FAILURE';

export const GET_FRIENDS_MATCH_REQUEST = 'GET_FRIENDS_MATCH_REQUEST';
export const GET_FRIENDS_MATCH_SUCCESS = 'GET_FRIENDS_MATCH_SUCCESS';
export const GET_FRIENDS_MATCH_FAILURE = 'GET_FRIENDS_MATCH_FAILURE';

export const CLEAR_ERROR = 'CLEAR_ERROR';

//actions
export const getFriendsRequest = () => {
    return {
        type: GET_FRIENDS_REQUEST
    }
}

export const getFriendsSuccess = (payload) => {
    return {
        type: GET_FRIENDS_SUCCESS,
        payload: payload
    }
}

export const getFriendsFailure = (payload) => {
    return {
        type: GET_FRIENDS_FAILURE,
        payload: payload
    }
}

// ********************| SEND FRIEND REQUEST |************************
export const sendFriendRequestRequest = (payload) => {
    return {
        type: SEND_FRIEND_REQUEST_REQUEST,
        payload: payload,
    }
}

export const sendFriendRequestSuccess = (payload) => {
    return {
        type: SEND_FRIEND_REQUEST_SUCCESS,
        payload: payload
    }
}

export const sendFriendRequestFailure = (payload) => {
    return {
        type: SEND_FRIEND_REQUEST_FAILURE,
        payload: payload
    }
}

// ********************| GET FRIEND REQUEST |************************

export const getFriendRequestRequest = () => {
    return {
        type: GET_FRIEND_REQUEST_REQUEST,
    }
}

export const getFriendRequestSuccess = (payload) => {
    return {
        type: GET_FRIEND_REQUEST_SUCCESS,
        payload: payload
    }
}

export const getFriendRequestFailure = (payload) => {
    return {
        type: GET_FRIEND_REQUEST_FAILURE,
        payload: payload
    }
}

// ********************| GET SENT FRIEND REQUEST |************************

export const getSentRequestRequest = () => {
    return {
        type: GET_SENT_REQUEST_REQUEST,
    }
}

export const getSentRequestSuccess = (payload) => {
    return {
        type: GET_SENT_REQUEST_SUCCESS,
        payload: payload
    }
}

export const getSentRequestFailure = (payload) => {
    return {
        type: GET_SENT_REQUEST_FAILURE,
        payload: payload
    }
}

// ********************| ACCEPT FRIEND REQUEST |************************

export const acceptFriendRequestRequest = (payload) => {
    return {
        type: ACCEPT_FRIEND_REQUEST_REQUEST,
        payload: payload
    }
}

export const acceptFriendRequestSuccess = (payload) => {
    return {
        type: ACCEPT_FRIEND_REQUEST_SUCCESS,
        payload: payload
    }
}

export const acceptFriendRequestFailure = (payload) => {
    return {
        type: ACCEPT_FRIEND_REQUEST_FAILURE,
        payload: payload
    }
}

// ********************| REMOVE FRIEND  |************************

export const removeFriendRequest = (payload) => {
    return {
        type: REMOVE_FRIEND_REQUEST,
        payload: payload
    }
}

export const removeFriendSuccess = (payload) => {
    return {
        type: REMOVE_FRIEND_SUCCESS,
        payload: payload
    }
}

export const removeFriendFailure = (payload) => {
    return {
        type: REMOVE_FRIEND_FAILURE,
        payload: payload
    }
}

// ********************| REVOQUE FRIEND REQUEST  |************************

export const revoqueRequest = () => {
    return {
        type: REVOQUE_REQUEST,
    }
}

export const revoqueSuccess = (payload) => {
    return {
        type: REVOQUE_SUCCESS,
        payload: payload
    }
}

export const revoqueFailure = (payload) => {
    return {
        type: REVOQUE_FAILURE,
        payload: payload
    }
}

// ********************| DECLINE FRIEND  |************************

export const declineFriendRequest = (payload) => {
    return {
        type: DECLINE_FRIEND_REQUEST,
        payload: payload
    }
}

export const declineFriendSuccess = (payload) => {
    return {
        type: DECLINE_FRIEND_SUCCESS,
        payload: payload
    }
}

export const declineFriendFailure = (payload) => {
    return {
        type: DECLINE_FRIEND_FAILURE,
        payload: payload
    }
}

// ********************| GET FAVORITE FRIEND |************************

export const getFavoriteRequest = () => {
    return {
        type: GET_FAVORITE_REQUEST
    }
}

export const getFavoriteSuccess = (payload) => {
    return {
        type: GET_FAVORITE_SUCCESS,
        payload: payload
    }
}

export const getFavoriteFailure = (payload) => {
    return {
        type: GET_FAVORITE_FAILURE,
        payload: payload
    }
}

// ********************| ADD FAVORITE FRIEND |************************

export const addFavoriteRequest = (payload) => {
    return {
        type: ADD_FAVORITE_REQUEST,
        payload: payload
    }
}

export const addFavoriteSuccess = (payload) => {
    return {
        type: ADD_FAVORITE_SUCCESS,
        payload: payload
    }
}

export const addFavoriteFailure = (payload) => {
    return {
        type: ADD_FAVORITE_FAILURE,
        payload: payload
    }
}


// ********************| REMOVE FAVORITE FRIEND  |************************

export const removeFavoriteRequest = (payload) => {
    return {
        type: REMOVE_FAVORITE_REQUEST,
        payload: payload
    }
}

export const removeFavoriteSuccess = (payload) => {
    return {
        type: REMOVE_FAVORITE_SUCCESS,
        payload: payload
    }
}

export const removeFavoriteFailure = (payload) => {
    return {
        type: REMOVE_FAVORITE_FAILURE,
        payload: payload
    }
}

// ********************| GET FRIEND BY ID |************************

export const getFriendIdRequest = (payload) => {
    return {
        type: GET_FRIEND_REQUEST,
        payload: payload
    }
}

export const getFriendIdSuccess = (payload) => {
    return {
        type: GET_FRIEND_SUCCESS,
        payload: payload
    }
}

export const getFriendIdFailure = (payload) => {
    return {
        type: GET_FRIEND_FAILURE,
        payload: payload
    }
}

// ********************| GET FRIENDS MATCH |************************

export const getFriendsMatchRequest = () => {
    return {
        type: GET_FRIENDS_MATCH_REQUEST
    }
}

export const getFriendsMatchSuccess = (payload) => {
    return {
        type: GET_FRIENDS_MATCH_SUCCESS,
        payload: payload
    }
}

export const getFriendsMatchFailure = (payload) => {
    return {
        type: GET_FRIENDS_MATCH_FAILURE,
        payload: payload
    }
}

export const clearErrorFriends = () => {
    return {
        type: CLEAR_ERROR,
    }
}