import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Col, Container } from 'reactstrap';
import { connect } from 'react-redux';

import { PostTitle } from 'components/common';
import { selectors as postsSelectors } from 'modules/posts';
import { actions as commentsActions } from 'modules/comments';

class Posts extends Component {
  componentDidMount() {
    this.props.fetchAllComments(this.props.post.id);
  }

  getPostTitleProps = () => ({
    author      : this.props.post.author,
    category    : this.props.post.category,
    commentCount: this.props.post.commentCount,
    timestamp   : this.props.post.timestamp,
    title       : this.props.post.title
  });

  renderSubtitle = () => (this.props.post.subtitle ? this.props.post.subtitle : null);

  renderTitle = () => (this.props.post.title ? this.props.post.title : null);

  renderBody = () => (this.props.post.body ? this.props.post.body : null);

  render() {
    return (
      <div>
        <PostTitle {...this.getPostTitleProps()} />
        <Container>
          <Col>
            <p>{this.renderBody()}</p>
          </Col>
        </Container>
        <Container fluid className="border border-secondary border-bottom-0 border-left-0 border-right-0">
          <Col>
            <h3 className="display-4 text-center">Leave A Reply</h3>
          </Col>
        </Container>
      </div>
    );
  }
}

Posts.propTypes = {
  post: PropTypes.object.isRequired
};

Posts.defaultProps = {};

const mapStateToProps = (state, props) => ({
  post: postsSelectors.getPostById(state, props.match.params.postId)
});

export default connect(mapStateToProps, {
  fetchAllComments: commentsActions.fetchCommentsByPost
})(Posts);
