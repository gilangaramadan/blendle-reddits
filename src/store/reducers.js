// import { combineReducers } from "redux";
import {
  FETCH_DATA_PENDING,
  FETCH_DATA_ERROR,
  RECEIVE_POSTS,
  RECEIVE_SUBREDDIT_DETAIL
} from "./actions";

const initialState = {
  posts: [],
  detail: {},
  pending: false,
  error: null
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_DATA_PENDING:
      return {
        ...state,
        pending: true
      };
    case RECEIVE_POSTS:
      return {
        ...state,
        pending: false,
        posts: action.payload
      };
    case RECEIVE_SUBREDDIT_DETAIL:
      return {
        ...state,
        pending: false,
        detail: action.payload
      };
    case FETCH_DATA_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error
      };
    default:
      return state;
  }
}

export default rootReducer;
