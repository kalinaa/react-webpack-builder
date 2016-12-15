import {
  TOGGLE_EDIT_USER_POPUP
} from '../constants/state';

const initialState = {
  editUserPopup: {
    visible: false
  }
};

export default function mainPage(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_EDIT_USER_POPUP:
      return {
        ...state,
        editUserPopup: {
          visible: !state.editUserPopup.visible
        }
      };

    default:
      return state;
  }
}