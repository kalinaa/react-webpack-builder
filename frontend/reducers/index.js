import { combineReducers } from 'redux';
import mainPage from './mainPageReducer';
import data from './dataReducer';
import app from './appReducer';

export default combineReducers({
  app,
  mainPage,
  data
})