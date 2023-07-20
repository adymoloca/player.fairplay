export const INVITE_PLAYER_REQUEST = 'INVITE_PLAYER_REQUEST';
export const INVITE_PLAYER_SUCCESS = 'INVITE_PLAYER_SUCCESS';
export const INVITE_PLAYER_FAILURE = 'INVITE_PLAYER_FAILURE';

export const GET_INVITATION_REQUEST_REQUEST = 'GET_INVITATION_REQUEST_REQUEST';
export const GET_INVITATION_REQUEST_SUCCESS = 'GET_INVITATION_REQUEST_SUCCESS';
export const GET_INVITATION_REQUEST_FAILURE = 'GET_INVITATION_REQUEST_FAILURE';

export const GET_SENT_INVITATION_REQUEST = 'GET_SENT_INVITATION_REQUEST';
export const GET_SENT_INVITATION_SUCCESS = 'GET_SENT_INVITATION_SUCCESS';
export const GET_SENT_INVITATION_FAILURE = 'GET_SENT_INVITATION_FAILURE';

export const ACCEPT_INVITATION_REQUEST = 'ACCEPT_INVITATION_REQUEST';
export const ACCEPT_INVITATION_SUCCESS = 'ACCEPT_INVITATION_SUCCESS';
export const ACCEPT_INVITATION_FAILURE = 'ACCEPT_INVITATION_FAILURE';


export const REVOQUE_INVITATION_REQUEST = 'REVOQUE_INVITATION_REQUEST';
export const REVOQUE_INVITATION_SUCCESS = 'REVOQUE_INVITATION_SUCCESS';
export const REVOQUE_INVITATION_FAILURE = 'REVOQUE_INVITATION_FAILURE';

export const DECLINE_INVITATION_REQUEST = 'DECLINE_INVITATION_REQUEST';
export const DECLINE_INVITATION_SUCCESS = 'DECLINE_INVITATION_SUCCESS';
export const DECLINE_INVITATION_FAILURE = 'DECLINE_INVITATION_FAILURE';


export const CLEAR_ERROR = 'CLEAR_ERROR';

// ************************| INVITE PLAYER |***********************
export const invitePlayerRequest = (payload) => {
    return {
        type: INVITE_PLAYER_REQUEST,
        payload: payload
    }
}

export const invitePlayerSuccess = (payload) => {
    return {
        type: INVITE_PLAYER_SUCCESS,
        payload: payload
    }
}

export const invitePlayerFailure = (payload) => {
    return {
        type: INVITE_PLAYER_FAILURE,
        payload: payload
    }
}

export const clearErrorInvite = () => {
    return {
        type: CLEAR_ERROR
    }
}

// ********************| GET INVITATION REQUEST |************************

export const getInvitationRequestRequest = () => {
    return {
        type: GET_INVITATION_REQUEST_REQUEST,
    }
}

export const getInvitationRequestSuccess = (payload) => {
    return {
        type: GET_INVITATION_REQUEST_SUCCESS,
        payload: payload
    }
}

export const getInvitationRequestFailure = (payload) => {
    return {
        type: GET_INVITATION_REQUEST_FAILURE,
        payload: payload
    }
}

// ********************| GET SENT INVITATION REQUEST |************************

export const getSentInvitationRequest = () => {
    return {
        type: GET_SENT_INVITATION_REQUEST,
    }
}

export const getSentInvitationSuccess = (payload) => {
    return {
        type: GET_SENT_INVITATION_SUCCESS,
        payload: payload
    }
}

export const getSentInvitationFailure = (payload) => {
    return {
        type: GET_SENT_INVITATION_FAILURE,
        payload: payload
    }
}


// ********************| ACCEPT INVITATION REQUEST |************************

export const acceptInvitationRequest = (payload) => {
    return {
        type: ACCEPT_INVITATION_REQUEST,
        payload: payload
    }
}

export const acceptInvitationSuccess = (payload) => {
    return {
        type: ACCEPT_INVITATION_SUCCESS,
        payload: payload
    }
}

export const acceptInvitationFailure = (payload) => {
    return {
        type: ACCEPT_INVITATION_FAILURE,
        payload: payload
    }
}

// ********************| REVOQUE INVITATION REQUEST  |************************

export const revoqueInvitationRequest = () => {
    return {
        type: REVOQUE_INVITATION_REQUEST,
    }
}

export const revoqueInvitationSuccess = (payload) => {
    return {
        type: REVOQUE_INVITATION_SUCCESS,
        payload: payload
    }
}

export const revoqueInvitationFailure = (payload) => {
    return {
        type: REVOQUE_INVITATION_FAILURE,
        payload: payload
    }
}

// ********************| DECLINE INVITATION  |************************

export const declineInvitationRequest = (payload) => {
    return {
        type: DECLINE_INVITATION_REQUEST,
        payload: payload
    }
}

export const declineInvitationSuccess = (payload) => {
    return {
        type: DECLINE_INVITATION_SUCCESS,
        payload: payload
    }
}

export const declineInvitationFailure = (payload) => {
    return {
        type: DECLINE_INVITATION_FAILURE,
        payload: payload
    }
}