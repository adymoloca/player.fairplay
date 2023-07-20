export const SET_FIELD_ID = 'SET_FIELD_ID';
export const SET_MATCH_ID = 'SET_MATCH_ID';
export const SET_ACTIVATE_EMAIL = 'SET_ACTIVATE_EMAIL';
export const CLEAR_ACTIVATE_EMAIL = 'CLEAR_ACTIVATE_EMAIL';
export const SET_SEARCH = 'SET_SEARCH';
export const CLEAR_SET_SEARCH = 'CLEAR_SET_SEARCH';
export const CLEAR_MATCH_ID = 'CLEAR_MATCH_ID';
export const FRIEND_ID = 'FRIEND_ID';
export const SET_SOCKET_LAST_PONG = 'SET_SOCKET_LAST_PONG';
export const SET_CARD = 'SET_CARD';
export const CLEAR_SET_CARD = 'CLEAR_SET_CARD';
export const SET_PRODUCT_ID = 'SET_PRODUCT_ID';
export const CLEAR_SET_PRODUCT_ID = 'CLEAR_SET_PRODUCT_ID';
export const SET_LANGUAGE = 'SET_LANGUAGE';

export const setFieldId = (payload) => {
    return {
        type: SET_FIELD_ID,
        payload: payload,
    };
};

export const setMatchId = (payload) => {
    return {
        type: SET_MATCH_ID,
        payload: payload,
    };
};

export const setActivateEmail = (payload) => {
    return {
        type: SET_ACTIVATE_EMAIL,
        payload: payload,
    };
};

export const clearActivateEmail = () => {
    return {
        type: CLEAR_ACTIVATE_EMAIL,
    };
};

export const setSearch = (payload) => {
    return {
        type: SET_SEARCH,
        payload: payload,
    };
};

export const clearSetSearch = () => {
    return {
        type: CLEAR_SET_SEARCH,
    };
};

export const setFriendId = (payload) => {
    return {
        type: FRIEND_ID,
        payload: payload,
    };
};

export const clearMatchId = () => {
    return {
        type: CLEAR_MATCH_ID,
    };
};

export const setSocketLastPong = (payload) => {
    return {
        type: SET_SOCKET_LAST_PONG,
        payload: payload,
    };
};

export const setCard = (payload) => {
    return {
        type: SET_CARD,
        payload: payload,
    };
};

export const clearSetCard = () => {
    return {
        type: CLEAR_SET_CARD,
    };
};

export const setProductId = (payload) => {
    return {
        type: SET_PRODUCT_ID,
        payload: payload,
    };
};

export const clearSetProductId = () => {
    return {
        type: CLEAR_SET_PRODUCT_ID,
    };
};

export const setLanguage = (payload) => {
    return {
        type: SET_LANGUAGE,
        payload : payload,

    }
}