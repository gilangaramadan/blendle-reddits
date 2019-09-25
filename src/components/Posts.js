import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export default class Posts extends Component {
  render() {
    const formatNumber = num => {
      return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
    };

    return (
      <div className="posts">
        {this.props.posts.map((post, i) => (
          <Link to={{ pathname: "/detail", subreddit: post.subreddit }} key={i}>
            <div className="card">
              <div className="title">{post.title}</div>
              <div className="reddit-user">
                {post.subreddit_name_prefixed}&nbsp;
                <span className="score">
                  &#8226; <strong>{formatNumber(post.score)}</strong> points
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    );
  }
}

Posts.propTypes = {
  posts: PropTypes.array.isRequired
};
