import {
  ADD_USER,
  EDIT_USER,
  GET_USERS,
  GET_USER,
  DELETE_USER,
  USER_LOADING
} from '../actions/types';

const initialState = {
  users: [],
  user: {},
  pagination: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_USERS:
      return {
        ...state,
        users: action.payload.users,
        pagination: action.payload.pagination,
        loading: false
      };
    case GET_USER:
      return {
        ...state,
        user: action.payload.user[0],
        loading: false
      };
    case ADD_USER:
      return {
        ...state,
        user: action.payload
      };
    case EDIT_USER:
      return {
        ...state,
        user: action.payload
      };
    case DELETE_USER:
    default:
      return state;
  }
}
