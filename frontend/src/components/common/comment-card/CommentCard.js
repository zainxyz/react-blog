import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Card, CardText, CardBody } from 'reactstrap';
import { connect } from 'react-redux';

import { actions as modalsActions } from 'modules/modals';
import { formatDateWithTime, MODAL_NAMES, sanitizeMarkup } from 'utils';

class CommentCard extends Component {
  editComment = () =>
    this.props.toggleModal(MODAL_NAMES.EDIT_COMMENT_MODAL, {
      body  : this.props.body,
      author: this.props.author
    });

  render() {
    const { author, timestamp, body } = this.props;
    return (
      <Card className="comment-card">
        <CardBody>
          <h5 className="card-title comment-author">{author}</h5>
          <div className="card-text comment-meta">
            <div className="comment-timestamp">
              <small>{formatDateWithTime(timestamp)}</small>
            </div>
            <div className="comment-actions">
              <ul className="list-inline">
                <li className="list-inline-item">
                  <button className="btn btn-link" onClick={this.editComment}>
                    Edit
                  </button>
                </li>
                <li className="list-inline-item">
                  <button className="btn btn-link">Delete</button>
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
  author     : PropTypes.string.isRequired,
  body       : PropTypes.string.isRequired,
  id         : PropTypes.string.isRequired,
  voteScore  : PropTypes.number,
  timestamp  : PropTypes.number.isRequired,
  toggleModal: PropTypes.func.isRequired
};

CommentCard.defaultProps = {
  voteScore: 0
};

export default connect(null, {
  toggleModal: modalsActions.toggleModalById
})(CommentCard);
