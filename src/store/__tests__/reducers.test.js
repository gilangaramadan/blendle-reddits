import { RECEIVE_SUBREDDIT_DETAIL } from "../actions";
import rootReducer from "../reducers";

describe("app reducer", () => {
  describe("rootReducer", () => {
    const initialState = {
      posts: [],
      detail: {},
      pending: false,
      error: null
    };
    it("should return the default state", () => {
      expect(rootReducer(initialState, {})).toBe(initialState);
    });
    it("should handle RECEIVE_SUBREDDIT_DETAIL", () => {
      const detail = { title: "abc", description: "def" };
      const action = {
        type: RECEIVE_SUBREDDIT_DETAIL,
        payload: detail
      };
      expect(rootReducer({}, action)).toEqual({
        detail,
        pending: false
      });
    });
  });
});
