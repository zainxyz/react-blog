import PropTypes from 'prop-types';
import React, { Component } from 'react';
import isEmpty from 'lodash/isEmpty';
import { Button, Col, Container } from 'reactstrap';
import { connect } from 'react-redux';

import { APP_ROUTE_NOT_FOUND, MODAL_NAMES, sanitizeMarkup } from 'utils';
import { CommentsList, AddCommentForm, PostTitle } from 'components/common';
import { actions as commentsActions, selectors as commentsSelectors } from 'modules/comments';
import { actions as modalsActions } from 'modules/modals';
import { selectors as postsSelectors } from 'modules/posts';

class PostDetails extends Component {
  componentWillMount(props) {
    if (isEmpty(this.props.post)) {
      this.props.history.replace(APP_ROUTE_NOT_FOUND);
    }
  }

  componentDidMount() {
    // Fetch all of the comments for the current post
    this.props.fetchAllComments(this.props.post.id);
    // Add an EDIT POST modal to the details page
    this.props.addModal(MODAL_NAMES.EDIT_POST_MODAL);
  }

  componentWillReceiveProps(nextProps) {
    if (isEmpty(nextProps.post)) {
      this.props.history.replace(APP_ROUTE_NOT_FOUND);
    }
  }

  onAddCommentSubmit = commentInfo => {
    this.props.addComment({
      ...commentInfo,
      parentId: this.props.post.id
    });
  };

  getBodyText = () => (this.props.post.body ? this.props.post.body : null);

  getPostTitleProps = () => {
    const { post } = this.props;

    return isEmpty(post)
      ? {}
      : {
        author      : this.props.post.author,
        category    : this.props.post.category,
        commentCount: this.props.commentCount,
        timestamp   : this.props.post.timestamp,
        title       : this.props.post.title,
        voteScore   : this.props.post.voteScore
      };
  };

  backToCategory = () => {
    this.props.history.replace(`/category/${this.props.match.params.categoryId}`);
  };

  deletePost = () =>
    this.props.toggleModal(MODAL_NAMES.DELETE_POST_MODAL, {
      ...this.props.post,
      onDelete: this.backToCategory
    });

  editPost = () =>
    this.props.toggleModal(MODAL_NAMES.EDIT_POST_MODAL, {
      ...this.props.post
    });

  render() {
    return (
      <div className="post-view">
        <PostTitle {...this.getPostTitleProps()} />
        <Container className="post-body">
          <Col>
            <div dangerouslySetInnerHTML={sanitizeMarkup(this.getBodyText())} />
          </Col>
        </Container>
        <Container fluid className="post-actions">
          <Col>
            <Button color="primary" onClick={this.editPost}>
              Edit Post
            </Button>
          </Col>
          <Col>
            <Button color="primary" onClick={this.deletePost}>
              Delete Post
            </Button>
          </Col>
        </Container>
        <Container className="post-comments">
          <CommentsList comments={this.props.comments} postId={this.props.post.id} />
        </Container>
        <Container fluid className="post-leave-a-reply">
          <Col>
            <h3 className="display-5 text-center">Leave A Reply</h3>
            <AddCommentForm onSubmit={this.onAddCommentSubmit} />
          </Col>
        </Container>
      </div>
    );
  }
}

PostDetails.propTypes = {
  addComment      : PropTypes.func.isRequired,
  addModal        : PropTypes.func.isRequired,
  commentCount    : PropTypes.number.isRequired,
  comments        : PropTypes.object,
  fetchAllComments: PropTypes.func.isRequired,
  history         : PropTypes.object.isRequired,
  match           : PropTypes.object.isRequired,
  post            : PropTypes.object,
  toggleModal     : PropTypes.func.isRequired
};

PostDetails.defaultProps = {
  comments: {},
  post    : {}
};

const mapStateToProps = (state, props) => ({
  commentCount: commentsSelectors.getCommentCountForPostId(state, props.match.params.postId),
  comments    : commentsSelectors.getCommentsForPostId(state, props.match.params.postId),
  post        : postsSelectors.getPostById(state, props.match.params.postId)
});

export default connect(mapStateToProps, {
  addComment      : commentsActions.addComment,
  addModal        : modalsActions.addModalById,
  fetchAllComments: commentsActions.fetchCommentsByPost,
  toggleModal     : modalsActions.toggleModalById
})(PostDetails);
