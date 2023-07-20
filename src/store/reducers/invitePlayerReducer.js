import { 
	INVITE_PLAYER_FAILURE, INVITE_PLAYER_REQUEST, INVITE_PLAYER_SUCCESS, 
	GET_INVITATION_REQUEST_REQUEST, GET_INVITATION_REQUEST_SUCCESS, GET_INVITATION_REQUEST_FAILURE, 
	GET_SENT_INVITATION_REQUEST, GET_SENT_INVITATION_SUCCESS, GET_SENT_INVITATION_FAILURE,
	CLEAR_ERROR,
    ACCEPT_INVITATION_REQUEST,
    ACCEPT_INVITATION_SUCCESS,
    ACCEPT_INVITATION_FAILURE,
    REVOQUE_INVITATION_REQUEST,
    REVOQUE_INVITATION_SUCCESS,
    REVOQUE_INVITATION_FAILURE,
    DECLINE_INVITATION_REQUEST,
    DECLINE_INVITATION_SUCCESS,
    DECLINE_INVITATION_FAILURE, 
} from '../types/invitePlayerTypes';

const initialState = {
	loading: false,
    loadingRevoque: false,
    loadingSent: false,
    loadingAction: false,
	error: {
		status: false,
		message: '',
	},
	invitations: [],
	sentInvitation: []
};

const invitationReducer = (state = initialState, action) => {
	switch (action.type) {
		case INVITE_PLAYER_REQUEST:
			return {
				...state,
				loading: true,
				error: {
					status: false,
				  },
			};
		case INVITE_PLAYER_SUCCESS:
			return {
				...state,
				loading: false,
				matches: action?.payload?.matches,
				error: {
					status: false,
                    message: action?.payload?.message
				  },
			};
		case INVITE_PLAYER_FAILURE:
			return {
				...state,
				loading: false,
				error: {
					status: true,
                    message: action?.payload?.error
				  },
			};
        case CLEAR_ERROR:
            return {
                ...state,
                loading: false,
                error: {
                    ...initialState?.error
                    },
            };
		// invitations
		case GET_INVITATION_REQUEST_REQUEST:
            return {
                ...state,
                loading: true,
                error: {
                    status: false,
                  },
            };
        case GET_INVITATION_REQUEST_SUCCESS:
            return {
                ...state,
                loading: false,
                error: {
					status: false,
				},
				invitations: action?.payload?.matchInvitations,
            };
        case GET_INVITATION_REQUEST_FAILURE:
            return {
                ...state,
                loading: false,
                error: {
                    status: true,
                  },
            };
        case GET_SENT_INVITATION_REQUEST:
            return {
                ...state,
                loadingSent: true,
                error: {
                    status: false,
                  },
            };
        case GET_SENT_INVITATION_SUCCESS:
            return {
                ...state,
                loadingSent: false,
                error: {
					status: false,
				},
				sentInvitation: action?.payload?.matchInvitations,
            };
        case GET_SENT_INVITATION_FAILURE:
            return {
                ...state,
                loadingSent: false,
                error: {
                    status: true,
                  },
            };
        case ACCEPT_INVITATION_REQUEST:
            return {
                ...state,
                loadingAction: true,
            };
        case ACCEPT_INVITATION_SUCCESS:
            return {
                ...state,
                loadingAction: false,
                error: {
                    status: false,
                    message: action?.payload?.message
                }
            };
        case ACCEPT_INVITATION_FAILURE:
            return {
                ...state,
                loadingAction: false,
                error: {
                    status: true,
                    message: action?.payload?.error
                }
            };
        case REVOQUE_INVITATION_REQUEST:
            return {
                ...state,
                loadingRevoque: true,
            };
        case REVOQUE_INVITATION_SUCCESS:
            return {
                ...state,
                loadingRevoque: false,
                error: {
                    status: false,
                    message: action?.payload?.message
                }
            };
        case REVOQUE_INVITATION_FAILURE:
            return {
                ...state,
                loadingRevoque: false,
                error: {
                    status: true,
                    message: action?.payload?.error
                }
            };
        case DECLINE_INVITATION_REQUEST:
            return {
                ...state,
                loadingAction: true,
            };
        case DECLINE_INVITATION_SUCCESS:
            return {
                ...state,
                loadingAction: false,
                error: {
                    status: false,
                    message: action?.payload?.message
                }
            };
        case DECLINE_INVITATION_FAILURE:
            return {
                ...state,
                loadingAction: false,
                error: {
                    status: true,
                    message: action?.payload?.error
                }
            };
        default :
            return state;
    }
}

export default invitationReducer