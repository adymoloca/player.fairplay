export const GET_PRODUCTS_REQUEST = 'GET_PRODUCTS_REQUEST';
export const GET_PRODUCTS_SUCCESS = 'GET_PRODUCTS_SUCCESS';
export const GET_PRODUCTS_FAILURE = 'GET_PRODUCTS_FAILURE';

export const ADD_CARD_REQUEST = 'ADD_CARD_REQUEST';
export const ADD_CARD_SUCCESS = 'ADD_CARD_SUCCESS';
export const ADD_CARD_FAILURE = 'ADD_CARD_FAILURE';

export const GET_CARDS_REQUEST = 'GET_CARDS_REQUEST';
export const GET_CARDS_SUCCESS = 'GET_CARDS_SUCCESS';
export const GET_CARDS_FAILURE = 'GET_CARDS_FAILURE';

export const PURCHASE_PRODUCT_REQUEST = 'PURCHASE_PRODUCT_REQUEST';
export const PURCHASE_PRODUCT_SUCCESS = 'PURCHASE_PRODUCT_SUCCESS';
export const PURCHASE_PRODUCT_FAILURE = 'PURCHASE_PRODUCT_FAILURE';

export const GET_PRODUCT_ID_REQUEST = 'GET_PRODUCT_ID_REQUEST';
export const GET_PRODUCT_ID_SUCCESS = 'GET_PRODUCT_ID_SUCCESS';
export const GET_PRODUCT_ID_FAILURE = 'GET_PRODUCT_ID_FAILURE';

export const CLEAR_ERROR = 'CLEAR_ERROR'

// ********************| GET ALL PRODUCTS |***************************

export const getProductsRequest = () => {
    return {
        type: GET_PRODUCTS_REQUEST
    }
}

export const getProductsSuccess = (payload) => {
    return {
        type: GET_PRODUCTS_SUCCESS,
        payload: payload
    }
}

export const getProductsFailure = (payload) => {
    return {
        type: GET_PRODUCTS_FAILURE,
        payload: payload
    }
}

// ********************| ADD CARD |***************************

export const addCardRequest = (payload) => {
    return {
        type: ADD_CARD_REQUEST,
        payload: payload
    }
}

export const addCardSuccess = (payload) => {
    return {
        type: ADD_CARD_SUCCESS,
        payload: payload
    }
}

export const addCardFailure = (payload) => {
    return {
        type: ADD_CARD_FAILURE,
        payload: payload
    }
}

// ********************| GET ALL PRODUCTS |***************************

export const getCardsRequest = (payload) => {
    return {
        type: GET_CARDS_REQUEST,
        payload: payload
    }
}

export const getCardsSuccess = (payload) => {
    return {
        type: GET_CARDS_SUCCESS,
        payload: payload
    }
}

export const getCardsFailure = (payload) => {
    return {
        type: GET_CARDS_FAILURE,
        payload: payload
    }
}

// ********************| PURCHASE PRODUCT |***************************

export const purchaseProductRequest = (payload) => {
    return {
        type: PURCHASE_PRODUCT_REQUEST,
        payload: payload
    }
}

export const purchaseProductSuccess = (payload) => {
    return {
        type: PURCHASE_PRODUCT_SUCCESS,
        payload: payload
    }
}

export const purchaseProductFailure = (payload) => {
    return {
        type: PURCHASE_PRODUCT_FAILURE,
        payload: payload
    }
}

// ********************| GET PRODUCT BY ID |***************************

export const getProductIdRequest = (payload) => {
    return {
        type: GET_PRODUCT_ID_REQUEST,
        payload: payload
    }
}

export const getProductIdSuccess = (payload) => {
    return {
        type: GET_PRODUCT_ID_SUCCESS,
        payload: payload
    }
}

export const getProductIdFailure = (payload) => {
    return {
        type: GET_PRODUCT_ID_FAILURE,
        payload: payload
    }
}

export const clearPaymentError = () => {
    return {
        type: CLEAR_ERROR,
    }
}