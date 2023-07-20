import {
    CHANGE_REQUEST,
    CHANGE_SUCCESS,
    CHANGE_FAILURE,
    CLEAR_ERROR,
} from '../types/changePasswordTypes';

const initialState = {
    loading: false,
    error: {
        status: false,
        message: "",
    }
}

const changeReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case CHANGE_SUCCESS:
            return {
                ...state,
                loading: false,
                error: {
                    status: false,
                    message: action?.payload?.message,
                },
            };
        case CHANGE_FAILURE:
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

export default changeReducer;