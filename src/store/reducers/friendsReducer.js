import {
    GET_FRIENDS_REQUEST, GET_FRIENDS_SUCCESS, GET_FRIENDS_FAILURE,
    SEND_FRIEND_REQUEST_REQUEST, SEND_FRIEND_REQUEST_SUCCESS, SEND_FRIEND_REQUEST_FAILURE,
    GET_FRIEND_REQUEST_REQUEST, GET_FRIEND_REQUEST_SUCCESS, GET_FRIEND_REQUEST_FAILURE,
    GET_SENT_REQUEST_REQUEST, GET_SENT_REQUEST_SUCCESS, GET_SENT_REQUEST_FAILURE,
    ACCEPT_FRIEND_REQUEST_REQUEST, ACCEPT_FRIEND_REQUEST_SUCCESS, ACCEPT_FRIEND_REQUEST_FAILURE,
    REMOVE_FRIEND_REQUEST, REMOVE_FRIEND_SUCCESS, REMOVE_FRIEND_FAILURE,
    REVOQUE_FAILURE, REVOQUE_SUCCESS, REVOQUE_REQUEST,
    CLEAR_ERROR,
    DECLINE_FRIEND_FAILURE, DECLINE_FRIEND_SUCCESS, DECLINE_FRIEND_REQUEST,
    GET_FAVORITE_REQUEST, GET_FAVORITE_SUCCESS, GET_FAVORITE_FAILURE,
    ADD_FAVORITE_REQUEST, ADD_FAVORITE_SUCCESS, ADD_FAVORITE_FAILURE,
    REMOVE_FAVORITE_REQUEST, REMOVE_FAVORITE_SUCCESS, REMOVE_FAVORITE_FAILURE, 
    GET_FRIEND_REQUEST, GET_FRIEND_SUCCESS, GET_FRIEND_FAILURE, GET_FRIENDS_MATCH_REQUEST, GET_FRIENDS_MATCH_SUCCESS, GET_FRIENDS_MATCH_FAILURE,
} from '../types/friendsTypes';

const initialState = {
    loading: false,
    error: {
        status: false,
        message: "",
    },
    friends: [],
    requests: [],
    sentRequest: [],
    favouriteFriends: [],
    playerId: {},
    matchFriends: []
};

const friendsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_FRIENDS_REQUEST:
            return {
                ...state,
                loading: true,
                error: {
                    status: false,
                  },
            };
        case GET_FRIENDS_SUCCESS:
            return {
                ...state,
                loading: false,
                friends: action?.payload?.friends,
                error: {
                    status: false,
                  },
            };
        case GET_FRIENDS_FAILURE:
            return {
                ...state,
                loading: false,
                error: {
                    status: true,
                  },
            };
        case SEND_FRIEND_REQUEST_REQUEST:
            return {
                ...state,
                loading: true,
                error: {
                    status: false,
                  },
            };
        case SEND_FRIEND_REQUEST_SUCCESS:
            return {
                ...state,
                loading: false,
                error: {
                    status: false,
                  },
            };
        case SEND_FRIEND_REQUEST_FAILURE:
            return {
                ...state,
                loading: false,
                error: {
                    status: true,
                  },
            };
        case GET_FRIEND_REQUEST_REQUEST:
            return {
                ...state,
                loading: true,
                error: {
                    status: false,
                  },
            };
        case GET_FRIEND_REQUEST_SUCCESS:
            return {
                ...state,
                loading: false,
                requests: action?.payload?.requests,
                error: {
                    status: false,
                  },
            };
        case GET_FRIEND_REQUEST_FAILURE:
            return {
                ...state,
                loading: false,
                error: {
                    status: true,
                  },
            };
        case GET_SENT_REQUEST_REQUEST:
            return {
                ...state,
                loading: true,
                error: {
                    status: false,
                  },
            };
        case GET_SENT_REQUEST_SUCCESS:
            return {
                ...state,
                loading: false,
                sentRequest: action?.payload?.request,
                error: {
                    status: false,
                  },
            };
        case GET_SENT_REQUEST_FAILURE:
            return {
                ...state,
                loading: false,
                error: {
                    status: true,
                  },
            };
        case ACCEPT_FRIEND_REQUEST_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case ACCEPT_FRIEND_REQUEST_SUCCESS:
            return {
                ...state,
                loading: false,
                error: {
                    status: false,
                    message: action?.payload?.message
                }
            };
        case ACCEPT_FRIEND_REQUEST_FAILURE:
            return {
                ...state,
                loading: false,
                error: {
                    status: true,
                    message: action?.payload?.error
                }
            };
        case REMOVE_FRIEND_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case REMOVE_FRIEND_SUCCESS:
            return {
                ...state,
                loading: false,
                error: {
                    status: false,
                    message: action?.payload?.message
                }
            };
        case REMOVE_FRIEND_FAILURE:
            return {
                ...state,
                loading: false,
                error: {
                    status: true,
                    message: action?.payload?.error
                }
            };
        case REVOQUE_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case REVOQUE_SUCCESS:
            return {
                ...state,
                loading: false,
                error: {
                    status: false,
                    message: action?.payload?.message
                }
            };
        case REVOQUE_FAILURE:
            return {
                ...state,
                loading: false,
                error: {
                    status: true,
                    message: action?.payload?.error
                }
            };
        case DECLINE_FRIEND_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case DECLINE_FRIEND_SUCCESS:
            return {
                ...state,
                loading: false,
                error: {
                    status: false,
                    message: action?.payload?.message
                }
            };
        case DECLINE_FRIEND_FAILURE:
            return {
                ...state,
                loading: false,
                error: {
                    status: true,
                    message: action?.payload?.error
                }
            };
        case GET_FAVORITE_REQUEST:
            return {
                ...state,
                loading: true,
                error: {
                    status: false,
                  },
            };
            
        case GET_FAVORITE_SUCCESS:
            return {
                ...state,
                loading: false,
                favouriteFriends: action?.payload?.favouriteFriends,
                error: {
                    status: false,
                  },
            };
        case GET_FAVORITE_FAILURE:
            return {
                ...state,
                loading: false,
                error: {
                    status: true,
                  },
            };
        case ADD_FAVORITE_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case ADD_FAVORITE_SUCCESS:
            return {
                ...state,
                loading: false,
                error: {
                    status: false,
                    message: action?.payload?.message
                }
            };
        case ADD_FAVORITE_FAILURE:
            return {
                ...state,
                loading: false,
                error: {
                    status: true,
                    message: action?.payload?.error
                }
            };
        case REMOVE_FAVORITE_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case REMOVE_FAVORITE_SUCCESS:
            return {
                ...state,
                loading: false,
                error: {
                    status: false,
                    message: action?.payload?.message
                }
            };
        case REMOVE_FAVORITE_FAILURE:
            return {
                ...state,
                loading: false,
                error: {
                    status: true,
                    message: action?.payload?.error
                }
            };
        case GET_FRIEND_REQUEST:
            return {
                ...state,
                loading: true,
                error: {
                    status: false,
                  },
            };
        case GET_FRIEND_SUCCESS:
            return {
                ...state,
                loading: false,
                error: {
                    status: false,
                },
                playerId: action?.payload?.player,
            };
        case GET_FRIEND_FAILURE:
            return {
                ...state,
                loading: false,
                error: {
                    status: true,
                },
            };
        case GET_FRIENDS_MATCH_REQUEST:
            return {
                ...state,
                loading: true,
                error: {
                    status: false,
                    },
            };
        case GET_FRIENDS_MATCH_SUCCESS:
            return {
                ...state,
                loading: false,
                error: {
                    status: false,
                },
                matchFriends: action?.payload?.friends,
            };
        case GET_FRIENDS_MATCH_FAILURE:
            return {
                ...state,
                loading: false,
                error: {
                    status: true,
                    },
            };
        case CLEAR_ERROR:
            return {
                ...state,
                error: { ...initialState.error },
            };
        default:
            return state;
    }
};

export default friendsReducer;