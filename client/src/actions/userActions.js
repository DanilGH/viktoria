import axios from 'axios';

import {
  ADD_USER,
  EDIT_USER,
  GET_ERRORS,
  CLEAR_ERRORS,
  GET_USERS,
  GET_USER,
  USER_LOADING,
  DELETE_USER
} from './types';

// Add User
export const addUser = userData => dispatch => {
  dispatch(clearErrors());
  return axios
    .post('/api/users', userData)
    .then(res =>
      dispatch({
        type: ADD_USER,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Edit User
export const editUser = userData => dispatch => {
  dispatch(clearErrors());
  return axios
    .put(`/api/users/${userData.user.id}`, userData)
    .then(res =>
      dispatch({
        type: EDIT_USER,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Get Users
export const getUsers = page => dispatch => {
  dispatch(setPostLoading());
  axios
    .get(`/api/users?page=${page}`)
    .then(res => {
      dispatch({
        type: GET_USERS,
        payload: res.data
      })
    })
    .catch(err =>
      dispatch({
        type: GET_USERS,
        payload: null
      })
    );
};

// Get User
export const getUser = id => dispatch => {
  dispatch(setPostLoading());
  axios
    .get(`/api/users/${id}`)
    .then(res =>
      dispatch({
        type: GET_USER,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_USER,
        payload: null
      })
    );
};

// Delete User
export const deleteUser = id => dispatch => {
  return axios
    .delete(`/api/users/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_USER,
        payload: id
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Set loading state
export const setPostLoading = () => {
  return {
    type: USER_LOADING
  };
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
