import {
    SET_FIELD_ID,
    SET_MATCH_ID,
    SET_ACTIVATE_EMAIL,
    CLEAR_ACTIVATE_EMAIL,
    SET_SEARCH,
    CLEAR_SET_SEARCH,
    FRIEND_ID,
    CLEAR_MATCH_ID,
    SET_SOCKET_LAST_PONG,
    CLEAR_SET_CARD,
    SET_CARD,
    SET_PRODUCT_ID,
    CLEAR_SET_PRODUCT_ID,
    SET_LANGUAGE,
} from 'store/types/utilsTypes';

const initialState = {
    utils: {
        fieldId: '',
        activateEmail: '',
        setSearch: '',
        friendId: '',
        matchId: '',
        socketLastPong: '',
        cardId: {},
        productId: '',
		language: 'en',
    },
};

const utilsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_FIELD_ID:
            return {
                ...state,
                utils: {
                    ...state?.utils,
                    fieldId: action?.payload,
                },
            };
        case SET_MATCH_ID:
            return {
                ...state,
                utils: {
                    ...state?.utils,
                    matchId: action?.payload,
                },
            };
        case SET_ACTIVATE_EMAIL:
            return {
                ...state,
                utils: {
                    ...state?.utils,
                    activateEmail: action?.payload,
                },
            };
        case CLEAR_ACTIVATE_EMAIL:
            return {
                ...state,
                utils: {
                    ...state?.utils,
                    activateEmail: '',
                },
            };
        case SET_SEARCH:
            return {
                ...state,
                utils: {
                    ...state?.utils,
                    setSearch: action?.payload,
                },
            };
        case CLEAR_SET_SEARCH:
            return {
                ...state,
                utils: {
                    ...state?.utils,
                    setSearch: '',
                },
            };
        case FRIEND_ID:
            return {
                ...state,
                utils: {
                    ...state?.utils,
                    friendId: action?.payload,
                },
            };
        case CLEAR_MATCH_ID:
            return {
                ...state,
                utils: {
                    ...state?.utils,
                    matchId: '',
                },
            };
        case SET_SOCKET_LAST_PONG: {
            return {
                ...state,
                utils: {
                    ...state?.utils,
                    socketLastPong: action?.payload,
                },
            };
        }
        case SET_CARD:
            return {
                ...state,
                utils: {
                    ...state?.utils,
                    cardId: action?.payload,
                },
            };
        case CLEAR_SET_CARD: {
            return {
                ...state,
                utils: {
                    ...state?.utils,
                    cardId: {},
                },
            };
        }
        case SET_PRODUCT_ID:
            return {
                ...state,
                utils: {
                    ...state?.utils,
                    productId: action?.payload,
                },
            };
        case CLEAR_SET_PRODUCT_ID:
            return {
                ...state,
                utils: {
                    ...state?.utils,
                    productId: '',
                },
            };
        case SET_LANGUAGE:
            return {
                ...state,
                utils: {
                    ...state?.utils,
                    language: action?.payload,
                }
            }
        default:
            return state;
    }
};

export default utilsReducer;
