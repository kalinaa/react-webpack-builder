import {
  TOGGLE_EDIT_USER_POPUP
} from '../constants/state';

export function toggleEditUserPopup() {
  return dispatch => {
    dispatch({
      type: TOGGLE_EDIT_USER_POPUP
    });
  }
}