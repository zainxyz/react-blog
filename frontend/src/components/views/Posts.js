import PropTypes from 'prop-types';
import React, { Component } from 'react';
import map from 'lodash/map';
import { Button, Col, Container, Row } from 'reactstrap';
import { connect } from 'react-redux';

import {
  CommentCard,
  AddCommentForm,
  DeletePostModal,
  EditPostModal,
  PostTitle
} from 'components/common';
import { actions as commentsActions, selectors as commentsSelectors } from 'modules/comments';
import { actions as modalsActions } from 'modules/modals';
import { generateKey, getCommentCount, MODAL_NAMES, sanitizeMarkup } from 'utils';
import { selectors as postsSelectors } from 'modules/posts';

class Posts extends Component {
  componentDidMount() {
    this.props.fetchAllComments(this.props.post.id);
    this.props.addModal(MODAL_NAMES.DELETE_POST_MODAL);
    this.props.addModal(MODAL_NAMES.EDIT_POST_MODAL);
  }

  onAddCommentSubmit = ({ author, body }) => {
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

  deletePost = () => this.props.toggleModal(MODAL_NAMES.DELETE_POST_MODAL);

  editPost = () => this.props.toggleModal(MODAL_NAMES.EDIT_POST_MODAL);

  backToCategory = () => {
    this.props.history.replace(`/${this.props.match.params.categoryId}`);
  };

  renderComments = () => {
    return map(this.props.comments, comment => <CommentCard key={generateKey()} {...comment} />);
  };

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
            <Button color="link" onClick={this.editPost}>
              Edit Post
            </Button>
          </Col>
          <Col>
            <Button color="link" onClick={this.deletePost}>
              Delete Post
            </Button>
          </Col>
        </Container>
        <Container className="post-comments">
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
        <Container fluid className="post-leave-a-reply">
          <Col>
            <h3 className="display-5 text-center">Leave A Reply</h3>
            <AddCommentForm onSubmit={this.onAddCommentSubmit} />
          </Col>
        </Container>
        <DeletePostModal
          author={this.props.post.author}
          onDelete={this.backToCategory}
          title={this.props.post.title}
        />
        <EditPostModal post={this.props.post} />
      </div>
    );
  }
}

Posts.propTypes = {
  addComment      : PropTypes.func.isRequired,
  addModal        : PropTypes.func.isRequired,
  commentCount    : PropTypes.number.isRequired,
  comments        : PropTypes.object,
  fetchAllComments: PropTypes.func.isRequired,
  history         : PropTypes.object.isRequired,
  match           : PropTypes.object.isRequired,
  post            : PropTypes.object.isRequired,
  toggleModal     : PropTypes.func.isRequired
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
  addComment      : commentsActions.addComment,
  addModal        : modalsActions.addModalById,
  fetchAllComments: commentsActions.fetchCommentsByPost,
  toggleModal     : modalsActions.toggleModalById
})(Posts);
