import fetch from "cross-fetch";

export const FETCH_DATA_PENDING = "FETCH_DATA_PENDING";
export const FETCH_DATA_ERROR = "FETCH_DATA_ERROR";
export const RECEIVE_POSTS = "RECEIVE_POSTS";

function fetchDataPending() {
  return {
    type: FETCH_DATA_PENDING
  };
}

function fetchDataError(error) {
  return {
    type: FETCH_DATA_ERROR,
    error
  };
}

function receivePosts(payload) {
  return {
    type: RECEIVE_POSTS,
    payload : payload.data.children.map(child => child.data)

  };
}

export function fetchPosts() {
  return dispatch => {
    dispatch(fetchDataPending());
    return fetch(`https://www.reddit.com/best.json?limit=10`)
    .then(res => res.json())
    .then(res => {
        if(res.error) {
            throw(res.error);
        }
        dispatch(receivePosts(res));
        return res;
    })
    .catch(error => {
        dispatch(fetchDataError(error));
    })
  };
}

// export function fetchDetail(subreddit) {
//   return dispatch => {
//     dispatch(fetchDataPending());
//     return fetch(`https://www.reddit.com/r/${subreddit}/about.json`)
//     .then(res => res.json())
//     .then(res => {
//         if(res.error) {
//             throw(res.error);
//         }
//         dispatch(receiveDetail(res));
//         return res;
//     })
//     .catch(error => {
//         dispatch(fetchDataError(error));
//     })
//   }
// }