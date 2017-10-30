import PropTypes from 'prop-types';
import React from 'react';
import ThumbsDownIcon from 'react-icons/lib/md/thumb-down';
import ThumbsUpIcon from 'react-icons/lib/md/thumb-up';
import HeartIcon from 'react-icons/lib/md/favorite';
import { Button, Col } from 'reactstrap';

const getHeartColor = score => {
  if (score < 0) {
    return '#dc3545';
  } else if (score > 0) {
    return '#28a745';
  }

  return '#333';
};

const VoteScore = ({ className, onClick, id, score }) => (
  <Col className={`vote-score ${className}`}>
    <Col className="vote-count">
      <HeartIcon size={24} color={getHeartColor(score)} /> {score}
    </Col>
    <Col className="vote-actions col-md-4">
      <Button
        className="btn-no-outline"
        color="success"
        onClick={() => onClick({ id, option: 'upVote' })}
        outline
        size="sm"
      >
        <ThumbsUpIcon size={24} />
      </Button>
      <Button
        className="btn-no-outline"
        color="danger"
        onClick={() => onClick({ id, option: 'downVote' })}
        outline
        size="sm"
      >
        <ThumbsDownIcon size={24} />
      </Button>
    </Col>
  </Col>
);

VoteScore.propTypes = {
  onClick  : PropTypes.func,
  id       : PropTypes.string,
  className: PropTypes.string,
  score    : PropTypes.number
};

VoteScore.defaultProps = {
  onClick  : () => {},
  id       : '',
  className: '',
  score    : 0
};

export default VoteScore;
