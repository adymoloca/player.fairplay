//types
export const GET_MEMBERS_REQUEST = 'GET_MEMBERS_REQUEST';
export const GET_MEMBERS_SUCCESS = 'GET_MEMBERS_SUCCESS';
export const GET_MEMBERS_FAILURE = 'GET_MEMBERS_FAILURE';
export const GET_MEMBER_REQUEST = 'GET_MEMBER_REQUEST';
export const GET_MEMBER_SUCCESS = 'GET_MEMBER_SUCCESS';
export const GET_MEMBER_FAILURE = 'GET_MEMBER_FAILURE';
export const ADD_MEMBER_REQUEST = 'ADD_MEMBER_REQUEST';
export const ADD_MEMBER_SUCCESS = 'ADD_MEMBER_SUCCESS';
export const ADD_MEMBER_FAILURE = 'ADD_MEMBER_FAILURE';
export const UPDATE_MEMBER_REQUEST = 'UPDATE_MEMBER_REQUEST';
export const UPDATE_MEMBER_SUCCESS = 'UPDATE_MEMBER_SUCCESS';
export const UPDATE_MEMBER_FAILURE = 'UPDATE_MEMBER_FAILURE';
export const DELETE_MEMBER_REQUEST = 'DELETE_MEMBER_REQUEST';
export const DELETE_MEMBER_SUCCESS = 'DELETE_MEMBER_SUCCESS';
export const DELETE_MEMBER_FAILURE = 'DELETE_MEMBER_FAILURE';
export const CLEAR_ERROR = 'CLEAR_ERROR';
export const CLEAR_MEMBERS = 'CLEAR_MEMBERS';

//actions
export const getMembersRequest = () => {
    return {
        type: GET_MEMBERS_REQUEST
    }
}

export const getMembersSuccess = (payload) => {
    return {
        type: GET_MEMBERS_SUCCESS,
        payload: payload
    }
}

export const getMembersFailure = (payload) => {
    return {
        type: GET_MEMBERS_FAILURE,
        payload: payload
    }
}

export const getMemberRequest = () => {
    return {
        type: GET_MEMBER_REQUEST
    }
}

export const getMemberSuccess = (payload) => {
    return {
        type: GET_MEMBER_SUCCESS,
        payload: payload
    }
}

export const getMemberFailure = (payload) => {
    return {
        type: GET_MEMBER_FAILURE,
        payload: payload
    }
}

export const addMemberRequest = () => {
    return {
        type: ADD_MEMBER_REQUEST
    }
}

export const addMemberSuccess = (payload) => {
    return {
        type: ADD_MEMBER_SUCCESS,
        payload: payload
    }
}

export const addMemberFailure = (payload) => {
    return {
        type: ADD_MEMBER_FAILURE,
        payload: payload
    }
}

export const updateMemberRequest = () => {
    return {
        type: UPDATE_MEMBER_REQUEST
    }
}

export const updateMemberSuccess = (payload) => {
    return {
        type: UPDATE_MEMBER_SUCCESS,
        payload: payload
    }
}

export const updateMemberFailure = (payload) => {
    return {
        type: UPDATE_MEMBER_FAILURE,
        payload: payload
    }
}

export const deleteMemberRequest = () => {
    return {
            type: DELETE_MEMBER_REQUEST
        }
}

export const deleteMemberSuccess = (payload) => {
    return {
        type: DELETE_MEMBER_SUCCESS,
        payload: payload
    }
}

export const deleteMemberFailure = (payload) => {
    return {
        type: DELETE_MEMBER_FAILURE,
        payload: payload
    }
}

export const clearError = () => {
    return {
        type: CLEAR_ERROR
    }
}

export const clearMembers = () => {
    return {
        type: CLEAR_MEMBERS
    }
}