import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import { App } from "../App";

describe("App", () => {
  it("renders without crashing given the required props", () => {
    const props = {
      error: null,
      posts: [],
      pending: false,
      fetchPosts: jest.fn()
    };
    const wrapper = shallow(<App {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
