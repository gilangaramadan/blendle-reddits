import React, { Component } from "react";
import ReactDOM from "react-dom";

class App extends Component {
  constructor(props) {}
  render() {
    return (
      <div className="row">
        <div className="col-sm-offset-2 col-sm-8 col-xs-12">
          <div className="box">
            <div className="header">
              <h1>Home</h1>
              <small>Top 10 posts</small>
            </div>
            <div className="card">
              <div className="question">
                What something the internet killed that you miss?
              </div>
              <div className="reddit-user">
                r/Askreddit{" "}
                <span className="point">
                  &#8226; <strong>12.345</strong> points
                </span>
              </div>
            </div>
            <div className="card">
              <div className="question">
                What something the internet killed that you miss?
              </div>
              <div className="reddit-user">
                r/Askreddit{" "}
                <span className="point">
                  &#8226; <strong>12.345</strong> points
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
