export const CHANGE_REQUEST = 'CHANGE_REQUEST';
export const CHANGE_SUCCESS = 'CHANGE_SUCCESS';
export const CHANGE_FAILURE = 'CHANGE_FAILURE';
export const CLEAR_ERROR = 'CLEAR_ERROR';

// *****************| RECOVER |*************************

export const changeRequest = () => {
    return {
        type: CHANGE_REQUEST,
    }
}

export const changeSuccess = (response) => {
    return {
        type: CHANGE_SUCCESS,
        payload: response
    }
}

export const changeFailure = (response) => {
    return {
        type: CHANGE_FAILURE,
        payload: response
    }
}

export const clearErrorChange = () => {
    return {
        type: CLEAR_ERROR
    }
}