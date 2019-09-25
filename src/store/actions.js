import fetch from "cross-fetch";

export const FETCH_DATA_PENDING = "FETCH_DATA_PENDING";
export const FETCH_DATA_ERROR = "FETCH_DATA_ERROR";
export const RECEIVE_POSTS = "RECEIVE_POSTS";
export const RECEIVE_SUBREDDIT_DETAIL = "RECEIVE_SUBREDDIT_DETAIL";

const fetchDataPending = () => ({
  type: FETCH_DATA_PENDING
});

const fetchDataError = error => ({
  type: FETCH_DATA_ERROR,
  error
});

export const transformResponseBodyPosts = payload => {
  return payload.data.children.map(child => child.data);
};

export const receivePosts = payload => ({
  type: RECEIVE_POSTS,
  payload: transformResponseBodyPosts(payload)
});

export const transformResponseBodyDetail = payload => {
  return payload.data;
};

export const receiveSubredditDetail = payload => ({
  type: RECEIVE_SUBREDDIT_DETAIL,
  payload: transformResponseBodyDetail(payload)
});

export function fetchPosts() {
  return dispatch => {
    dispatch(fetchDataPending());
    return fetch(`https://www.reddit.com/best.json?limit=10`)
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          throw res.error;
        }
        dispatch(receivePosts(res));
        return res;
      })
      .catch(error => {
        dispatch(fetchDataError(error));
      });
  };
}

export function fetchDetail(subreddit) {
  return dispatch => {
    dispatch(fetchDataPending());
    return fetch(`https://www.reddit.com/r/${subreddit}/about.json`)
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          throw res.error;
        }
        dispatch(receiveSubredditDetail(res));
        return res;
      })
      .catch(error => {
        dispatch(fetchDataError(error));
      });
  };
}
