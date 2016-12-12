import {
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS
} from '../constants/user'

const initialState = {
  user: {
    nickname: ''
  }
};

export default function User(state = initialState, action) {
  switch (action.type) {
    case LOAD_USER_REQUEST:
      return {
        ...state
      };
    case LOAD_USER_SUCCESS:
      return {
        ...state,
        user: Object.assign({}, state.user, action.payload)
      };

    default:
      return state;
  }
}