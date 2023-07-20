export const RESET_REQUEST = 'RESET_REQUEST';
export const RESET_SUCCESS = 'RESET_SUCCESS';
export const RESET_FAILURE = 'RRESET_FAILURE';
export const CLEAR_ERROR = 'CLEAR_ERROR';

// *****************| RECOVER |*************************

export const resetRequest = () => {
    return {
        type: RESET_REQUEST,
    }
}

export const resetSuccess = (response) => {
    return {
        type: RESET_SUCCESS,
        payload: response
    }
}

export const resetFailure = (error) => {
    return {
        type: RESET_FAILURE,
        payload: error
    }
}

export const clearErrorReset = () => {
    return {
        type: CLEAR_ERROR,
    }
}