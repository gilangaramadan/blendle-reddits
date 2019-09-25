import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchDetail } from "../store/actions";

class DetailPost extends Component {
  constructor(props) {
    super(props);
    this.shouldComponentRender = this.shouldComponentRender.bind(this);
  }

  componentDidMount() {
    console.log(this.props);
    const { fetchDetail, location } = this.props;
    fetchDetail(location.subreddit);
  }

  shouldComponentRender() {
    const { pending } = this.props;
    if (pending === false) return false;
    // more tests
    return true;
  }

  isEmpty(obj) {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  }

  render() {
    const { detail, error, pending } = this.props;
    const formatNumber = num => {
      return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
    };
    return (
      <div style={{ opacity: pending ? 0.5 : 1, marginTop: "64px" }}>
        <Link to="/" className="back-to-home">
          Home
        </Link>
        <div>
          {this.shouldComponentRender() && this.isEmpty(detail) && (
            <span className="text-helper" style={{ marginTop: "24px" }}>
              Loading...
            </span>
          )}
          {!this.isEmpty(detail) && (
            <React.Fragment>
              <div className="header detail">
                <h1>{detail.display_name_prefixed}</h1>
                <small>Subreddit details</small>
              </div>
              <div className="detail-content">
                <h5>Title</h5>
                <span>{detail.title}</span>
              </div>
              <div className="detail-content">
                <h5>Public description</h5>
                <span>{detail.public_description}</span>
              </div>
              <div className="detail-content">
                <h5>Subscriber count</h5>
                <span>{formatNumber(detail.subscribers)}</span>
              </div>
            </React.Fragment>
          )}
          {error && <span className="text-helper error">{error}</span>}
        </div>
      </div>
    );
  }
}

DetailPost.propTypes = {
  detail: PropTypes.object.isRequired,
  pending: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  error: state.error,
  detail: state.detail,
  pending: state.pending
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchDetail
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailPost);
