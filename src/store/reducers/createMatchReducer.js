import {
    POST_CREATE_REQUEST, POST_CREATE_SUCCESS, POST_CREATE_FAILURE, CLEAR_CREATE, CLEAR_ERROR
} from '../types/createMatchTypes.js';

let initialState ={
    loading: false,
    error: {
        status: false,
        message: '',
    }
}

const createReducer =(state = initialState, action) =>{
    switch (action.type){
        case POST_CREATE_REQUEST:
            return{
                ...state,
                loading: true
            }
        case POST_CREATE_SUCCESS:
            return{
                ...state,
                loading: false,
                error: {
                    status: false,
                    message: action?.payload?.message
                }
            }
        case POST_CREATE_FAILURE:
            return {
                ...state,
                loading: false,
                error: {
                    status: true,
                    message: action?.payload?.error
                }
            }
        case CLEAR_CREATE :
            return {
                ...initialState
            }
        case CLEAR_ERROR :
            return {
                ...state,
                error: { ...initialState.error },
            };
          default:
              return state;
    }
}

export default createReducer;