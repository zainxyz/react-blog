import PropTypes from 'prop-types';
import React from 'react';
import { Card, CardText, CardBody, CardTitle } from 'reactstrap';

import { formatDateWithTime, sanitizeMarkup } from 'utils';

const CommentCard = ({ author, timestamp, body }) => (
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
              <button className="btn btn-link">Edit</button>
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

CommentCard.propTypes = {
  author   : PropTypes.string.isRequired,
  body     : PropTypes.string.isRequired,
  timestamp: PropTypes.number.isRequired
};

export default CommentCard;
