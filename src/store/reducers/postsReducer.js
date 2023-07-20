import {
    GET_POSTS_REQUEST,
    GET_POSTS_SUCCESS,
    GET_POSTS_FAILURE,
    GET_POST_REQUEST,
    GET_POST_SUCCESS,
    GET_POST_FAILURE,
    ADD_POSTS_REQUEST,
    ADD_POSTS_SUCCESS,
    ADD_POSTS_FAILURE,
    UPDATE_POSTS_REQUEST,
    UPDATE_POSTS_SUCCESS,
    UPDATE_POSTS_FAILURE,
    DELETE_POSTS_REQUEST,
    DELETE_POSTS_SUCCESS,
    DELETE_POSTS_FAILURE,
    CLEAR_POSTS,
    CLEAR_ERROR,
} from "../types/postsTypes.js";

const initialState = {
    loading: false,
    error: {
        status: false,
        message: "",
    },
    news: [],
    post: {},
};

const newsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_POSTS_REQUEST:
            return {
                ...state,
                loading: true,
                error: {
                    status: false,
                  },
            };
        case GET_POSTS_SUCCESS:
            return {
                ...state,
                loading: false,
                news: action?.payload?.posts,
                error: {
                    status: false,
                  },
            };
        case GET_POSTS_FAILURE:
            return {
                ...state,
                loading: false,
                error: {
                    status: true,
                  },
            };
        case GET_POST_REQUEST:
            return {
                ...state,
                loading: true,
                error: {
                    status: false,
                  },
            };
        case GET_POST_SUCCESS:
            return {
                ...state,
                loading: false,
                post: action?.payload?.post,
                error: {
                    status: false,
                  },
            };
        case GET_POST_FAILURE:
            return {
                ...state,
                loading: false,
                error: {
                    status: true,
                  },
            };
        case ADD_POSTS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case ADD_POSTS_SUCCESS:
            return {
                ...state,
                loading: false,
                error: {
                    status: false,
                    message: action?.payload?.message,
                },
                news: action?.payload?.posts,
            };
        case ADD_POSTS_FAILURE:
            return {
                ...state,
                loading: false,
                error: {
                    status: true,
                    message: action?.payload?.message,
                },
            };
        case UPDATE_POSTS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case UPDATE_POSTS_SUCCESS:
            return {
                ...state,
                loading: false,
                error: {
                    status: false,
                    message: action?.payload?.message,
                },
            };
        case UPDATE_POSTS_FAILURE:
            return {
                ...state,
                loading: false,
                error: {
                    status: true,
                    message: action?.payload?.message,
                },
            };
        case DELETE_POSTS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case DELETE_POSTS_SUCCESS:
            return {
                ...state,
                loading: false,
                error: {
                    status: false,
                    message: action?.payload?.message,
                },
                // news: action?.payload?.news
            };
        case DELETE_POSTS_FAILURE:
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
                error: { ...initialState.error },
            };
        case CLEAR_POSTS:
            return {
                ...initialState,
            };
        default:
            return state;
    }
};

export default newsReducer;
