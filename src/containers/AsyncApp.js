import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  fetchPostsIfNeeded,
  invalidateSubreddit
} from "../store/actions";
import Posts from "../components/Posts";

class AsyncApp extends Component {
  // constructor(props) {
  //   super(props);
  // }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(invalidateSubreddit());
    dispatch(fetchPostsIfNeeded());
  }

  render() {
    const { posts, isFetching } = this.props;
    return (
      <div className="row">
        <div className="col-sm-offset-2 col-sm-8 col-xs-12">
          <div className="box">
            <div className="header">
              <h1>Home</h1>
              <small>Top 10 posts</small>
            </div>
            {isFetching && posts.length === 0 && <h2>Loading...</h2>}
            {!isFetching && posts.length === 0 && <h2>Empty.</h2>}
            {posts.length > 0 && (
              <div style={{ opacity: isFetching ? 0.5 : 1 }}>
                <Posts posts={posts} />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

AsyncApp.propTypes = {
  posts: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const { isFetching, lastUpdated, items: posts } =  {
    isFetching: true,
    items: []
  };

  return {
    posts,
    isFetching,
    lastUpdated
  };
}

export default connect(mapStateToProps)(AsyncApp);
