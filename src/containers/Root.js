import React, { Component } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import configureStore from "../store/configureStore";
import "../styles/app.scss";
import App from "./App";
import DetailPost from "../components/DetailPost";

const store = configureStore();

export default class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="row">
            <div className="col-sm-offset-2 col-sm-8 col-xs-12">
              <div className="box">
                <Route exact path="/" component={App} />
                <Route path="/detail" component={DetailPost} />
                <Redirect to="/" />
              </div>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}
