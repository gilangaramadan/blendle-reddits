import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchPosts } from "../store/actions";

import Posts from "../components/Posts";

class AsyncApp extends Component {
  constructor(props) {
    super(props);
    this.shouldComponentRender = this.shouldComponentRender.bind(this);
  }

  componentDidMount() {
    const { fetchPosts } = this.props;
    fetchPosts();
  }

  shouldComponentRender() {
    const { pending } = this.props;
    if (pending === false) return false;
    // more tests
    return true;
  }

  render() {
    const { posts, error, pending } = this.props;
    return (
      <React.Fragment>
        <div className="header home">
          <h1>Home</h1>
          <small>Top 10 posts</small>
        </div>
        {this.shouldComponentRender() && posts.length === 0 && (
          <h1>Loading...</h1>
        )}
        {!this.shouldComponentRender() && posts.length === 0 && <h1>Empty.</h1>}
        {posts.length > 0 && (
          <div style={{ opacity: pending ? 0.5 : 1 }}>
            {error && <span className="">{error}</span>}
            <Posts posts={posts} />
          </div>
        )}
      </React.Fragment>
    );
  }
}

AsyncApp.propTypes = {
  posts: PropTypes.array.isRequired,
  pending: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  error: state.error,
  posts: state.posts,
  pending: state.pending
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchPosts
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AsyncApp);
