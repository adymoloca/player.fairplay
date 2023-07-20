import {
  GET_MEMBERS_REQUEST,
  GET_MEMBERS_SUCCESS,
  GET_MEMBERS_FAILURE,
  GET_MEMBER_REQUEST,
  GET_MEMBER_SUCCESS,
  GET_MEMBER_FAILURE,
  ADD_MEMBER_REQUEST,
  ADD_MEMBER_SUCCESS,
  ADD_MEMBER_FAILURE,
  UPDATE_MEMBER_REQUEST,
  UPDATE_MEMBER_SUCCESS,
  UPDATE_MEMBER_FAILURE,
  DELETE_MEMBER_REQUEST,
  DELETE_MEMBER_SUCCESS,
  DELETE_MEMBER_FAILURE,
  CLEAR_MEMBERS,
  CLEAR_ERROR,
} from "../types/membersTypes.js";

const initialState = {
  loading: false,
  error: {
    status: false,
    message: "",
  },
  members: [],
  member: {},
};

const membersReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MEMBERS_REQUEST:
      return {
        ...state,
        loading: true,
        error: {
          status: false,
        },
      };
    case GET_MEMBERS_SUCCESS:
      return {
        ...state,
        loading: false,
        members: action?.payload?.members,
        error: {
          status: false,
        },
      };
    case GET_MEMBERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: {
          status: true,
        },
      };
    case GET_MEMBER_REQUEST:
      return {
        ...state,
        loading: true,
        error: {
          status: false,
        },
      };
    case GET_MEMBER_SUCCESS:
      return {
        ...state,
        loading: false,
        member: action?.payload?.member,
        error: {
          status: false,
        },
      };
    case GET_MEMBER_FAILURE:
      return {
        ...state,
        loading: false,
        error: {
          status: true,
        },
      };
    case ADD_MEMBER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADD_MEMBER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: {
          status: false,
          message: action?.payload?.message,
        },
        members: action?.payload?.members,
      };
    case ADD_MEMBER_FAILURE:
      return {
        ...state,
        loading: false,
        error: {
          status: true,
          message: action?.payload?.message,
        },
      };
    case UPDATE_MEMBER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_MEMBER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: {
          status: false,
          message: action?.payload?.message,
        },
      };
    case UPDATE_MEMBER_FAILURE:
      return {
        ...state,
        loading: false,
        error: {
          status: true,
          message: action?.payload?.message,
        },
      };
    case DELETE_MEMBER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_MEMBER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: {
          status: false,
          message: action?.payload?.message,
        },
        // members: action?.payload?.members
      };
    case DELETE_MEMBER_FAILURE:
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
    case CLEAR_MEMBERS:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export default membersReducer;
