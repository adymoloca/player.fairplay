export const RECOVER_REQUEST = 'RECOVER_REQUEST';
export const RECOVER_SUCCESS = 'RECOVER_SUCCESS';
export const RECOVER_FAILURE = 'RECOVER_FAILURE';
export const CLEAR_ERROR = 'CLEAR_ERROR';

// *****************| RECOVER |*************************

export const recoverRequest = () => {
    return {
        type: RECOVER_REQUEST,
    }
}

export const recoverSuccess = (response) => {
    return {
        type: RECOVER_SUCCESS,
        payload: response
    }
}

export const recoverFailure = (error) => {
    return {
        type: RECOVER_FAILURE,
        payload: error
    }
}

export const clearErrorRecover = () => {
    return {
        type: CLEAR_ERROR
    }
}