import $ from 'jquery';

import {
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
} from '../constants/user.js';

export function loadUserContent() {
  return dispatch => {
    dispatch({
      type: LOAD_USER_REQUEST
    });

    $.get({
      url: '/api/user'
    })
    .done(res => {
      dispatch({
        type: LOAD_USER_SUCCESS,
        payload: res
      })
    })
    .fail(() => alert('Server error!'));
  }
}

