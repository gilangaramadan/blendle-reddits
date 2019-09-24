import fetch from "cross-fetch";

export const REQUEST_POSTS = "REQUEST_POSTS";
export const RECEIVE_POSTS = "RECEIVE_POSTS";
export const REQUEST_DETAIL = "REQUEST_DETAIL";
export const RECEIVE_DETAIL = "RECEIVE_DETAIL";

export const INVALIDATE_SUBREDDIT = "INVALIDATE_SUBREDDIT";

export function invalidateSubreddit() {
  return {
    type: INVALIDATE_SUBREDDIT
  };
}

function requestPosts() {
  return {
    type: REQUEST_POSTS
  };
}

function requestDetail() {
  return {
    type: REQUEST_DETAIL
  };
}

function receivePosts(json) {
  return {
    type: RECEIVE_POSTS,
    posts: json.data.children.map(child => child.data)
  };
}

function receiveDetail(json) {
  return {
    type: RECEIVE_DETAIL,
    posts: json.data.children.map(child => child.data)
  };
}

function fetchPosts() {
  return dispatch => {
    dispatch(requestPosts());
    return fetch(`https://www.reddit.com/best.json?limit=10`)
      .then(response => response.json())
      .then(json => dispatch(receivePosts(json)));
  };
}

function fetchDetail(subreddit) {
  return dispatch => {
    dispatch(requestDetail());
    return fetch(`https://www.reddit.com/r/${subreddit}/about.json`)
      .then(response => response.json())
      .then(json => dispatch(receiveDetail(json)))
  }
}

function shouldFetchPosts(state, subreddit) {
  const posts = state.bestSubredditPost[subreddit];
  if (!posts) {
    return true;
  } else if (posts.isFetching) {
    return false;
  } else {
    return posts.didInvalidate;
  }
}

export function fetchPostsIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchPosts(getState())) {
      return dispatch(fetchPosts());
    }
  };
}
