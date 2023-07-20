import {
    RESET_REQUEST,
    RESET_SUCCESS,
    RESET_FAILURE,
    CLEAR_ERROR,
} from '../types/resetTypes';

const initialState = {
    loading: false,
    error: {
        status: false,
        message: "",
    }
}

const resetReducer = (state = initialState, action) => {
    switch (action.type) {
        case RESET_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case RESET_SUCCESS:
            return {
                ...state,
                loading: false,
                error: {
                    status: false,
                    message: action?.payload?.message,
                },
            };
        case RESET_FAILURE:
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

export default resetReducer;