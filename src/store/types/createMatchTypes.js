// types
export const POST_CREATE_REQUEST = 'POST_CREATE_REQUEST';
export const POST_CREATE_SUCCESS = 'POST_CREATE_SUCCESS';
export const POST_CREATE_FAILURE = 'POST_CREATE_FAILURE';
export const CLEAR_CREATE = 'CLEAR_CREATE';
export const CLEAR_ERROR = 'CLEAR_ERROR';

// actions
export const postCreateRequest = () =>{
    return{
        type: POST_CREATE_REQUEST
    }
}

export const postCreateSuccess = (response) =>{
    return{
        type: POST_CREATE_SUCCESS,
        payload: response
    }
}

export const postCreateFailure = (error) =>{
    return{
        type: POST_CREATE_FAILURE,
        payload: error
    }
}
export const clearCreate = () => {
    return {
        type: CLEAR_CREATE
    }
}

export const clearErrorCreateMatch = () => {
    return {
        type: CLEAR_ERROR
    }
}
