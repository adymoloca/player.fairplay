import {
    GET_FIELDS_REQUEST,
    GET_FIELDS_SUCCESS,
    GET_FIELD_FAILURE,
    GET_FIELD_REQUEST,
    GET_FIELD_SUCCESS,
    GET_FIELDS_FAILURE,
    GET_NEAR_FIELDS_REQUEST,
    GET_NEAR_FIELDS_SUCCESS,
    GET_NEAR_FIELDS_FAILURE,
    CLEAR_ERROR,
} from '../types/fieldsTypes.js'

const initialState = {
    loading: false,
    error: {
      status: false,
      message: "",
    },
    fields: [],
    field: {},
    nearbyFields: [],
  };

  const fieldsReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_FIELDS_REQUEST:
        return {
          ...state,
          loading: true,
          error: {
            status: false,
          },
        };
      case GET_FIELDS_SUCCESS:
        return {
          ...state,
          loading: false,
          fields: action?.payload?.fields,
          error: {
            status: false,
          },
        };
      case GET_FIELDS_FAILURE:
        return {
          ...state,
          loading: false,
          error: {
            status: true,
          },
        };
        case GET_FIELD_REQUEST:
          return {
            ...state,
            loading: true,
            error: {
              status: false,
            },
          };
        case GET_FIELD_SUCCESS:
          return {
            ...state,
            loading: false,
            error: {
              status: false,
            },
            field: action?.payload?.field,
          };
        case GET_FIELD_FAILURE:
          return {
            ...state,
            loading: false,
            error: {
              status: true,
            },
          };
        case GET_NEAR_FIELDS_REQUEST:
        return {
          ...state,
          loading: true,
          error: {
            status: false,
          },
        };
      case GET_NEAR_FIELDS_SUCCESS:
        return {
          ...state,
          loading: false,
          nearbyFields: action?.payload?.nearbyFields,
          error: {
            status: false,
          },
        };
      case GET_NEAR_FIELDS_FAILURE:
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

  export default fieldsReducer;