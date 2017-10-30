import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Badge, Card, CardBody, CardLink, CardText } from 'reactstrap';
import { connect } from 'react-redux';

import { actions as commentsActions } from 'modules/comments';
import { actions as modalsActions } from 'modules/modals';
import { formatDateWithTime, MODAL_NAMES, sanitizeMarkup } from 'utils';

class CommentCard extends Component {
  editComment = () =>
    this.props.toggleModal(MODAL_NAMES.EDIT_COMMENT_MODAL, {
      author: this.props.author,
      body  : this.props.body,
      id    : this.props.id,
      email : this.props.email
    });

  deleteComment = () =>
    this.props.toggleModal(MODAL_NAMES.DELETE_COMMENT_MODAL, {
      author: this.props.author,
      date  : formatDateWithTime(this.props.timestamp),
      id    : this.props.id
    });

  render() {
    const { author, id, timestamp, body, voteOnComment, voteScore } = this.props;

    return (
      <Card className="comment-card">
        <CardBody>
          <h5 className="card-title comment-author">
            {author} <Badge color="secondary">{voteScore}</Badge>
          </h5>
          <div className="card-text comment-meta">
            <div className="comment-timestamp">
              <small>{formatDateWithTime(timestamp)}</small>
            </div>
            <div className="comment-actions">
              <ul className="list-inline">
                <li className="list-inline-item">
                  <CardLink tag="button" className="btn btn-link" onClick={this.editComment}>
                    Edit
                  </CardLink>
                </li>
                <li className="list-inline-item">
                  <CardLink tag="button" className="btn btn-link" onClick={this.deleteComment}>
                    Delete
                  </CardLink>
                </li>
              </ul>
            </div>
          </div>
          <CardText className="comment-body" dangerouslySetInnerHTML={sanitizeMarkup(body)} />
        </CardBody>
        <CardBody>
          <CardLink
            tag="button"
            className="btn btn-link"
            onClick={() => voteOnComment({ id: id, option: 'upVote' })}
          >
            Up Vote
          </CardLink>
          <CardLink
            tag="button"
            className="btn btn-link"
            onClick={() => voteOnComment({ id: id, option: 'downVote' })}
          >
            Down Vote
          </CardLink>
        </CardBody>
      </Card>
    );
  }
}

CommentCard.propTypes = {
  author       : PropTypes.string.isRequired,
  body         : PropTypes.string.isRequired,
  email        : PropTypes.string.isRequired,
  id           : PropTypes.string.isRequired,
  timestamp    : PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  toggleModal  : PropTypes.func.isRequired,
  voteOnComment: PropTypes.func.isRequired,
  voteScore    : PropTypes.number
};

CommentCard.defaultProps = {
  voteScore: 0
};

export default connect(null, {
  toggleModal  : modalsActions.toggleModalById,
  voteOnComment: commentsActions.voteOnComment
})(CommentCard);
