import PropTypes from 'prop-types';
import React, { Component } from 'react';
import map from 'lodash/map';
import { Col, Container, Row } from 'reactstrap';
import { connect } from 'react-redux';

import { CommentReplyForm, PostTitle } from 'components/common';
import { selectors as postsSelectors } from 'modules/posts';
import { actions as commentsActions, selectors as commentsSelectors } from 'modules/comments';
import { formatDateWithTime, generateKey, getCommentCount, sanitizeMarkup } from 'utils';

class Posts extends Component {
  componentDidMount() {
    this.props.fetchAllComments(this.props.post.id);
  }

  onSubmit = ({ author, body }) => {
    this.props.addComment({
      author,
      body,
      parentId: this.props.post.id
    });
  };

  getBodyText = () => (this.props.post.body ? this.props.post.body : null);

  getPostTitleProps = () => ({
    author      : this.props.post.author,
    category    : this.props.post.category,
    commentCount: this.props.commentCount,
    timestamp   : this.props.post.timestamp,
    title       : this.props.post.title
  });

  renderComments = () => {
    return map(this.props.comments, comment => (
      <div key={generateKey()}>
        <p className="font-weight-bold">{comment.author}</p>
        <small>{formatDateWithTime(comment.timestamp)}</small>
        <p className="lead">{comment.body}</p>
      </div>
    ));
  };

  render() {
    return (
      <div>
        <PostTitle {...this.getPostTitleProps()} />
        <Container className="post-body">
          <Col>
            <div dangerouslySetInnerHTML={sanitizeMarkup(this.getBodyText())} />
          </Col>
        </Container>
        <Container className="post-comments-container">
          <Row>
            <Col>
              <h5 className="text-center font-italic font-weight-light">Join the discussion</h5>
              <h2 className="display-4 text-center font-weight-bold">
                {getCommentCount(this.props.commentCount)}
              </h2>
            </Col>
          </Row>
          <Row>
            <Col>{this.renderComments()}</Col>
          </Row>
        </Container>
        <Container
          fluid
          className="post-replies border border-secondary border-bottom-0 border-left-0 border-right-0"
        >
          <Col>
            <h3 className="display-5 text-center">Leave A Reply</h3>
            <CommentReplyForm onSubmit={this.onSubmit} />
          </Col>
        </Container>
      </div>
    );
  }
}

Posts.propTypes = {
  addComment      : PropTypes.func.isRequired,
  commentCount    : PropTypes.number.isRequired,
  comments        : PropTypes.object,
  fetchAllComments: PropTypes.func.isRequired,
  post            : PropTypes.object.isRequired
};

Posts.defaultProps = {
  comments: {}
};

const mapStateToProps = (state, props) => ({
  post        : postsSelectors.getPostById(state, props.match.params.postId),
  comments    : commentsSelectors.getCommentsForPostId(state, props.match.params.postId),
  commentCount: commentsSelectors.getCommentCountForPostId(state, props.match.params.postId)
});

export default connect(mapStateToProps, {
  fetchAllComments: commentsActions.fetchCommentsByPost,
  addComment      : commentsActions.addComment
})(Posts);
