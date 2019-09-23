import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class DetailPost extends Component {
  render() {
    const { match, location } = this.props;
    const detail = location.detail.post;
    return (
      <div>
        <p>{detail.subreddit_name_prefixed}</p>
        <p>{detail.title}</p>
        <p>{detail.subreddit_subscribers}</p>
        <Link to="/">Back</Link>
      </div>
    );
  }
}
