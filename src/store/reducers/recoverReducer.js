import {
    RECOVER_REQUEST,
    RECOVER_SUCCESS,
    RECOVER_FAILURE,
    CLEAR_ERROR,
} from '../types/recoverTypes';

const initialState = {
    loading: false,
    error: {
        status: false,
        message: "",
    }
}

const recoverReducer = (state = initialState, action) => {
    switch (action.type) {
        case RECOVER_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case RECOVER_SUCCESS:
            return {
                ...state,
                loading: false,
                error: {
                    status: false,
                    message: action?.payload?.message,
                },
                recoveryCode: action?.payload?.recoveryCode
            };
        case RECOVER_FAILURE:
            return {
                ...state,
                loading: false,
                error: {
                    status: true,
                    message: action?.payload?.error,
                }
            };
        case CLEAR_ERROR:
            return {
                ...state,
                error: { ...initialState.error },
            };
        default:
            return state;
    }
}

export default recoverReducer;