import * as actions from "../actions";
import thunk from "redux-thunk";
import fetchMock from "fetch-mock";
import configureMockStore from "redux-mock-store";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("actions", () => {
  // Add the mockJSON response
  const mockPostJSON = {
    data: {
      children: [{ data: { title: "Post 1" } }, { data: { title: "Post 2" } }]
    }
  };
  const mockSubredditDetailJSON = {
    data: {
      title: "Reddit Pics",
      url: "/r/pics/"
    }
  };
  const subreddit = "pics";

  describe("receivePosts", () => {
    it("should create expected action", () => {
      const expectedAction = {
        type: actions.RECEIVE_POSTS,
        payload: actions.transformResponseBodyPosts(mockPostJSON)
      };
      expect(actions.receivePosts(mockPostJSON)).toMatchObject(expectedAction);
    });
  });

  describe("fetchDetail", () => {
    afterEach(() => {
      fetchMock.restore();
    });

    it("creates FETCH_DATA_PENDING and RECEIVE_POSTS when fetching posts", () => {
      fetchMock.getOnce(`https://www.reddit.com/r/${subreddit}/about.json`, {
        body: mockSubredditDetailJSON
      });

      const expectedActions = [
        { type: actions.FETCH_DATA_PENDING },
        {
          type: actions.RECEIVE_SUBREDDIT_DETAIL,
          payload: actions.transformResponseBodyDetail(mockSubredditDetailJSON)
        }
      ];

      const store = mockStore({});
      return store.dispatch(actions.fetchDetail(subreddit)).then(() => {
        expect(store.getActions()).toMatchObject(expectedActions);
      });
    });
  });
});
