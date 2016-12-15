import {
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  EDIT_USER_SUCCESS
} from '../constants/user.js';

// ax - it's ajax-library axios

export function loadUser() {
  return dispatch => {
    dispatch({
      type: LOAD_USER_REQUEST
    });

    ax.get('/api/user')
    .then(res => {
      dispatch({
        type: LOAD_USER_SUCCESS,
        payload: res.data
      })
    })
    .catch(() => alert('Server error!'));
  }
}

export function editUser(data) {
  return dispatch => {
    ax.post('/api/user/update', {
      userId: data.userId,
      nickname: data.nickname,
    })
    .then(res => {
      dispatch({
        type: EDIT_USER_SUCCESS,
        payload: res.data
      })
    })
    .catch(() => alert('Server error!'));
  }
}

