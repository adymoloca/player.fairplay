import {
    ADD_TICKET_REQUEST,
    ADD_TICKET_SUCCESS,
    ADD_TICKET_FAILURE,
    CLEAR_ERROR
} from 'store/types/ticketTypes';

const initialState = {
    loading: false,
    error: {
        status: false,
        message: "",
    },
};

const ticketReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TICKET_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case ADD_TICKET_SUCCESS:
            return {
                ...state,
                loading: false,
                error: {
                    status: false,
                    message: action?.payload?.message,
                },
            };
        case ADD_TICKET_FAILURE:
            return {
                ...state,
                loading: false,
                error: {
                    status: true,
                    message: action?.payload?.message,
                },
            };
        case CLEAR_ERROR:
            return {
                ...state,
                loading: false,
                error: {
                    status: false,
                    message: '',
                },
            };
        default: 
            return state ;
    }
}

export default ticketReducer;