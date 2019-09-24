// import { combineReducers } from "redux";
import { FETCH_DATA_PENDING, FETCH_DATA_ERROR, RECEIVE_POSTS } from "./actions";

const initialState = {
  posts: [],
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
    case FETCH_DATA_ERROR:
      return {
        ...state,
        pending: false,
        posts: action.error
      };
    default:
      return state;
  }
}

export const getPosts = state => state.posts;
export const getPostsPending = state => state.pending;
export const getPostsError = state => state.error;

export default rootReducer;
