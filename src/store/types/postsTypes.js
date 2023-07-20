//types
export const GET_POSTS_REQUEST = 'GET_POSTS_REQUEST';
export const GET_POSTS_SUCCESS = 'GET_POSTS_SUCCESS';
export const GET_POSTS_FAILURE = 'GET_POSTS_FAILURE';
export const GET_POST_SUCCESS = 'GET_POST_SUCCESS';
export const GET_POST_FAILURE = 'GET_POST_FAILURE';
export const GET_POST_REQUEST = 'GET_POST_REQUEST';
export const ADD_POSTS_REQUEST = 'ADD_POSTS_REQUEST';
export const ADD_POSTS_SUCCESS = 'ADD_POSTS_SUCCESS';
export const ADD_POSTS_FAILURE = 'ADD_POSTS_FAILURE';
export const UPDATE_POSTS_REQUEST = 'UPDATE_POSTS_REQUEST';
export const UPDATE_POSTS_SUCCESS = 'UPDATE_POSTS_SUCCESS';
export const UPDATE_POSTS_FAILURE = 'UPDATE_POSTS_FAILURE';
export const DELETE_POSTS_REQUEST = 'DELETE_POSTS_REQUEST';
export const DELETE_POSTS_SUCCESS = 'DELETE_POSTS_SUCCESS';
export const DELETE_POSTS_FAILURE = 'DELETE_POSTS_FAILURE';
export const CLEAR_ERROR = 'CLEAR_ERROR';
export const CLEAR_POSTS = 'CLEAR_POSTS';

//actions
export const getPostsRequest = () => {
    return {
        type: GET_POSTS_REQUEST
    }
}

export const getPostsSuccess = (payload) => {
    return {
        type: GET_POSTS_SUCCESS,
        payload: payload
    }
}

export const getPostsFailure = (payload) => {
    return {
        type: GET_POSTS_FAILURE,
        payload: payload
    }
}

export const getPostRequest = () => {
    return {
        type: GET_POST_REQUEST
    }
}

export const getPostSuccess = (payload) => {
    return {
        type: GET_POST_SUCCESS,
        payload: payload
    }
}

export const getPostFailure = (payload) => {
    return {
        type: GET_POST_FAILURE,
        payload: payload
    }
}

export const addPostsRequest = () => {
    return {
        type: ADD_POSTS_REQUEST
    }
}

export const addPostsSuccess = (payload) => {
    return {
        type: ADD_POSTS_SUCCESS,
        payload: payload
    }
}

export const addPostsFailure = (payload) => {
    return {
        type: ADD_POSTS_FAILURE,
        payload: payload
    }
}

export const updatePostsRequest = () => {
    return {
        type: UPDATE_POSTS_REQUEST
    }
}

export const updatePostsSuccess = (payload) => {
    return {
        type: UPDATE_POSTS_SUCCESS,
        payload: payload
    }
}

export const updatePostsFailure = (payload) => {
    return {
        type: UPDATE_POSTS_FAILURE,
        payload: payload
    }
}

export const deletePostsRequest = () => {
    return {
        type: DELETE_POSTS_REQUEST
    }
}

export const deletePostsSuccess = (payload) => {
    return {
        type: DELETE_POSTS_SUCCESS,
        payload: payload
    }
}

export const deletePostsFailure = (payload) => {
    return {
        type: DELETE_POSTS_FAILURE,
        payload: payload
    }
}

export const clearError = () => {
    return {
        type: CLEAR_ERROR
    }
}

export const clearPosts = () => {
    return {
        type: CLEAR_POSTS
    }
}