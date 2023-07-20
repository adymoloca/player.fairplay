//types
export const GET_FIELDS_REQUEST = 'GET_FIELDS_REQUEST';
export const GET_FIELDS_SUCCESS = 'GET_FIELDS_SUCCESS';
export const GET_FIELDS_FAILURE = 'GET_FIELDS_FAILURE';

export const GET_FIELD_REQUEST = 'GET_FIELD_REQUEST';
export const GET_FIELD_SUCCESS = 'GET_FIELD_SUCCESS';
export const GET_FIELD_FAILURE = 'GET_FIELD_FAILURE';

export const GET_NEAR_FIELDS_REQUEST = 'GET_NEAR_FIELDS_REQUEST';
export const GET_NEAR_FIELDS_SUCCESS = 'GET_NEAR_FIELDS_SUCCESS';
export const GET_NEAR_FIELDS_FAILURE = 'GET_NEAR_FIELDS_FAILURE';

export const CLEAR_ERROR = 'CLEAR_ERROR';

//actions
export const getFieldsRequest = () => {
    return {
        type: GET_FIELDS_REQUEST
    }
}

export const getFieldsSuccess = (payload) => {
    return {
        type: GET_FIELDS_SUCCESS,
        payload: payload
    }
}

export const getFieldsFailure = (payload) => {
    return {
        type: GET_FIELDS_FAILURE,
        payload: payload
    }
}

export const getNearFieldsRequest = () => {
    return {
        type: GET_NEAR_FIELDS_REQUEST
    }
}

export const getNearFieldsSuccess = (payload) => {
    return {
        type: GET_NEAR_FIELDS_SUCCESS,
        payload: payload
    }
}

export const getNearFieldsFailure = (payload) => {
    return {
        type: GET_NEAR_FIELDS_FAILURE,
        payload: payload
    }
}

// ******************** GET FIELD ***************************
export const getFieldRequest = () => {
    return {
        type: GET_FIELD_REQUEST
    }
}

export const getFieldSuccess = (payload) => {
    return {
        type: GET_FIELD_SUCCESS,
        payload: payload
    }
}

export const getFieldFailure = (payload) => {
    return {
        type: GET_FIELD_FAILURE,
        payload: payload
    }
}

export const clearErrorFields = () => {
    return {
        type: CLEAR_ERROR,
    }
}