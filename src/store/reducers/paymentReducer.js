import { GET_PRODUCTS_REQUEST, GET_PRODUCTS_SUCCESS, GET_PRODUCTS_FAILURE, CLEAR_ERROR, ADD_CARD_REQUEST, ADD_CARD_SUCCESS, ADD_CARD_FAILURE, GET_CARDS_REQUEST, GET_CARDS_SUCCESS, GET_CARDS_FAILURE, PURCHASE_PRODUCT_REQUEST, PURCHASE_PRODUCT_SUCCESS, PURCHASE_PRODUCT_FAILURE, GET_PRODUCT_ID_REQUEST, GET_PRODUCT_ID_SUCCESS, GET_PRODUCT_ID_FAILURE } from "store/types/paymentTypes";

const initialState = {
	loading: false,
	loadingPay: false,
    error: {
		status: false,
		message: '',
	},
    products: [],
    productById: {},
	cards: []
}

const paymentReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_PRODUCTS_REQUEST:
			return {
				...state,
				loading: true,
				error: {
					status: false,
				  },
			};
		case GET_PRODUCTS_SUCCESS:
			return {
				...state,
				loading: false,
				error: {
                    status: false,
                },
                products: action?.payload?.products,
			};
		case GET_PRODUCTS_FAILURE:
			return {
				...state,
				loading: false,
				error: {
					status: true,
				},
			};
		// ADD CARD
		case ADD_CARD_REQUEST:
			return {
				...state,
				loading: true,
				error: {
					status: false,
				  },
			};
		case ADD_CARD_SUCCESS:
			return {
				...state,
				loading: false,
				error: {
                    status: false,
					message: action?.payload?.message
                },
			};
		case ADD_CARD_FAILURE:
			return {
				...state,
				loading: false,
				error: {
					status: true,
					message: action?.payload?.error
				},
			};
		// get CARDS
		case GET_CARDS_REQUEST:
			return {
				...state,
				loading: true,
				error: {
					status: false,
				  },
			};
		case GET_CARDS_SUCCESS:
			return {
				...state,
				loading: false,
				error: {
                    status: false,
                },
                cards: action?.payload?.cards,
			};
		case GET_CARDS_FAILURE:
			return {
				...state,
				loading: false,
				error: {
					status: true,
				},
			};
		// purchase product
		case PURCHASE_PRODUCT_REQUEST:
			return {
				...state,
				loadingPay: true,
				error: {
					status: false,
				  },
			};
		case PURCHASE_PRODUCT_SUCCESS:
			return {
				...state,
				loadingPay: false,
				error: {
                    status: false,
					message: action?.payload?.message
                },
			};
		case PURCHASE_PRODUCT_FAILURE:
			return {
				...state,
				loadingPay: false,
				error: {
					status: true,
					message: action?.payload?.error
				},
			};
		// GET PRODUCT BY ID
		case GET_PRODUCT_ID_REQUEST:
			return {
				...state,
				loading: true,
				error: {
					status: false,
				  },
			};
		case GET_PRODUCT_ID_SUCCESS:
			return {
				...state,
				loading: false,
				error: {
                    status: false,
                },
                productById: action?.payload?.product,
			};
		case GET_PRODUCT_ID_FAILURE:
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
				loading: false,
				error: {
					status: false,
				},
            }
        default: 
            return state;
    }
}

export default paymentReducer;
