export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';

export const UPDATE_PLAYER_REQUEST = 'UPDATE_PLAYER_REQUEST';
export const UPDATE_PLAYER_SUCCESS = 'UPDATE_PLAYER_SUCCESS';
export const UPDATE_PLAYER_FAILURE = 'UPDATE_PLAYER_FAILURE';

export const REFRESH_TOKEN_REQUEST = 'REFRESH_TOKEN_REQUEST';
export const REFRESH_TOKEN_SUCCESS = 'REFRESH_TOKEN_SUCCESS';
export const REFRESH_TOKEN_FAILURE = 'REFRESH_TOKEN_FAILURE';


export const UPDATE_HOURS_REQUEST = 'UPDATE_HOURS_REQUEST';

export const CLEAR_ERROR = 'CLEAR_ERROR';
export const LOGOUT = 'LOGOUT';

// *****************| LOGIN |*************************

export const loginRequest = (payload) => {
    return {
        type: LOGIN_REQUEST,
        payload: payload
    }
}

export const loginSuccess = (payload) => {
    return {
        type: LOGIN_SUCCESS,
        payload: payload
    }
}

export const loginFailure = (payload) => {
    return {
        type: LOGIN_FAILURE,
        payload: payload
    }
}

// *****************| REGISTER |*************************


export const registerRequest = (payload) => {
    return {
        type: REGISTER_REQUEST,
        payload: payload
    }
}

export const registerSuccess = (payload) => {
    return {
        type: REGISTER_SUCCESS,
        payload: payload
    }
}

export const registerFailure = (payload) => {
    return {
        type: REGISTER_FAILURE,
        payload: payload
    }
}

export const logout = () => {
    return {
        type: LOGOUT
    }
}

// *****************| UPDATE PLAYER INFORMATION |*************************

export const updatePlayerRequest = () => {
    return {
        type: UPDATE_PLAYER_REQUEST
    }
}

export const updatePlayerSuccess = (payload) => {
    return {
        type: UPDATE_PLAYER_SUCCESS,
        payload: payload
    }
}

export const updatePlayerFailure = (payload) => {
    return {
        type: UPDATE_PLAYER_FAILURE,
        payload: payload
    }
}

export const clearErrorUser = () => {
    return {
        type: CLEAR_ERROR
    }
}

// *****************| REFRESH TOKEN  |*************************

export const refreshTokenRequest = (payload) => {
    return {
        type: REFRESH_TOKEN_REQUEST,
        payload: payload
    }
}

export const refreshTokenSuccess = (payload) => {
    return {
        type: REFRESH_TOKEN_SUCCESS,
        payload: payload
    }
}

export const refreshTokenFailure = (payload) => {
    return {
        type: REFRESH_TOKEN_FAILURE,
        payload: payload
    }
}

// *****************| ACTIVATE ACCOUNT TYPES |*************************
export const ACTIVATE_REQUEST = 'ACTIVATE_REQUEST';
export const ACTIVATE_SUCCESS = 'ACTIVATE_SUCCESS';
export const ACTIVATE_FAILURE = 'ACTIVATE_FAILURE';

export const RESET_ACTIVATE_REQUEST = 'RESET_ACTIVATE_REQUEST';
export const RESET_ACTIVATE_SUCCESS = 'RESET_ACTIVATE_SUCCESS';
export const RESET_ACTIVATE_FAILURE = 'RESET_ACTIVATE_FAILURE';

// *****************| ACTIONS |*************************

export const activateRequest = () => {
    return {
        type: ACTIVATE_REQUEST,
    }
}

export const activateSuccess = (response) => {
    return {
        type: ACTIVATE_SUCCESS,
        payload: response
    }
}

export const activateFailure = (error) => {
    return {
        type: ACTIVATE_FAILURE,
        payload: error
    }
}

export const resetActivateRequest = () => {
    return {
        type: RESET_ACTIVATE_REQUEST,
    }
}

export const resetActivateSuccess = (response) => {
    return {
        type: RESET_ACTIVATE_SUCCESS,
        payload: response
    }
}

export const resetActivateFailure = (error) => {
    return {
        type: RESET_ACTIVATE_FAILURE,
        payload: error
    }
}

// *****************| UPDATE PLAYER HOURS |*************************

export const updateHoursRequest = (payload) => {
    return {
        type: UPDATE_HOURS_REQUEST,
        payload: payload
    }
}