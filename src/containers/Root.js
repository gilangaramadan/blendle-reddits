import React, { Component } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import configureStore from "../store/configureStore";
import "../styles/app.scss";
import AsyncApp from "./AsyncApp";
import DetailPost from "../components/DetailPost";

const store = configureStore();

export default class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Route exact path="/" component={AsyncApp} />
          <Route path="/detail" component={DetailPost} />
          <Redirect to="/" />
        </Router>
      </Provider>
    );
  }
}
