import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Card, CardBody, CardHeader, CardLink, CardText, Row } from 'reactstrap';
import { connect } from 'react-redux';
import DeleteIcon from 'react-icons/lib/md/delete';
import EditIcon from 'react-icons/lib/md/edit';

import { VoteScore } from 'components/common';
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
        <CardHeader>
          <Row>
            <VoteScore
              id={id}
              score={voteScore}
              onClick={voteOnComment}
              className="col-sm-12 col-md-2 ml-auto"
            />
          </Row>
        </CardHeader>
        <CardBody>
          <h5 className="card-title comment-author">{author}</h5>
          <div className="card-text comment-meta">
            <div className="comment-timestamp">
              <small>{formatDateWithTime(timestamp)}</small>
            </div>
            <div className="comment-actions">
              <ul className="list-inline">
                <li className="list-inline-item">
                  <CardLink tag="button" className="btn btn-link" onClick={this.editComment}>
                    <EditIcon size={24} />
                  </CardLink>
                </li>
                <li className="list-inline-item">
                  <CardLink tag="button" className="btn btn-link" onClick={this.deleteComment}>
                    <DeleteIcon size={24} />
                  </CardLink>
                </li>
              </ul>
            </div>
          </div>
          <CardText className="comment-body" dangerouslySetInnerHTML={sanitizeMarkup(body)} />
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
