import React, { Component } from "react";
import PropTypes from "prop-types";

export default class Posts extends Component {
  render() {
    let formatNumber = num => {
      return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
    };

    return (
      <div>
        {this.props.posts.map((post, i) => (
          <div className="card" key={i}>
            <div className="title">{post.title}</div>
            <div className="reddit-user">
              {post.subreddit_name_prefixed}&nbsp;
              <span className="score">
                &#8226; <strong>{formatNumber(post.score)}</strong> points
              </span>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

Posts.propTypes = {
  posts: PropTypes.array.isRequired
};
