// types
export const ADD_TICKET_REQUEST = 'ADD_TICKET_REQUEST';
export const ADD_TICKET_SUCCESS = 'ADD_TICKET_SUCCESS';
export const ADD_TICKET_FAILURE = 'ADD_TICKET_FAILURE';
export const CLEAR_ERROR = 'CLEAR_ERROR';

// ACTIONS

export const addTicketRequest = (payload) => {
    return {
        type: ADD_TICKET_REQUEST,
        payload: payload
    }
}

export const addTicketSuccess = (payload) => {
    return {
        type: ADD_TICKET_SUCCESS,
        payload: payload
    }
}

export const addTicketFailure = (payload) => {
    return {
        type: ADD_TICKET_FAILURE,
        payload: payload
    }
}

export const clearErrorTicket = () => {
    return {
        type: CLEAR_ERROR
    }
}