import {
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS
} from '../constants/user';

const initialState = {
  fetching: false
};

export default function App(state = initialState, action) {
  switch (action.type) {
    case LOAD_USER_REQUEST:
      return { ...state, fetching: true };

    case LOAD_USER_SUCCESS:
      return { ...state, fetching: false };

    default:
      return state;
  }
}