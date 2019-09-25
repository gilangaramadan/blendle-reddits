import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchDetail } from "../store/actions";

class DetailPost extends Component {
  // constructor(props) {
  //   super(props);
  // }
  componentDidMount() {
    console.log(this.props);
    const { fetchDetail, location } = this.props;
    fetchDetail(location.subreddit);
  }

  render() {
    const { detail, error, pending } = this.props;
    return (
      <div>
        <p>{detail.display_name_prefixed}</p>
        <p>{detail.title}</p>
        <p>{detail.public_description}</p>
        <p>{detail.subscribers}</p>
        <Link to="/">Back</Link>
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
