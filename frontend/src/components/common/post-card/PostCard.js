import PropTypes from 'prop-types';
import React from 'react';
import Truncate from 'react-truncate';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardImg,
  CardSubtitle,
  CardText,
  CardTitle,
  Col,
  Row
} from 'reactstrap';

import { actions as postsActions } from 'modules/posts';
import { getCommentCount } from 'utils';
import { selectors as commentsSelectors } from 'modules/comments';

const renderPostExcerpt = excerpt => (
  <Truncate lines={2} ellipsis={<span>...</span>}>
    {excerpt}
  </Truncate>
);

const PostCard = ({
  author,
  activeCommentCount,
  category,
  commentCount,
  excerpt,
  id,
  title,
  voteOnPost,
  voteScore
}) => (
  <Card>
    {/* <CardImg top width="100%" src="http://placehold.it/100x200" alt="Post Image Caption" /> */}
    <CardBody>
      <CardTitle>
        {title} <Badge color="info">{voteScore}</Badge>{' '}
        <a onClick={() => voteOnPost({ id: id, option: 'upVote' })} role="button">
          <small>upVote</small>
        </a>{' '}
        |{' '}
        <a onClick={() => voteOnPost({ id: id, option: 'downVote' })} role="button">
          <small>downVote</small>
        </a>
      </CardTitle>
      <CardSubtitle>
        <Row>
          <Col md="6" className="text-left">
            <small>written by: {author}</small>
          </Col>
          <Col md="6" className="text-right">
            <small>{getCommentCount(activeCommentCount)}</small>
          </Col>
        </Row>
      </CardSubtitle>
      <CardText>{renderPostExcerpt(excerpt)}</CardText>
      <Button color="info" tag={NavLink} to={`/${category}/${id}`}>
        View Post
      </Button>
    </CardBody>
  </Card>
);

PostCard.propTypes = {
  author            : PropTypes.string.isRequired,
  activeCommentCount: PropTypes.number.isRequired,
  category          : PropTypes.string.isRequired,
  commentCount      : PropTypes.number.isRequired,
  excerpt           : PropTypes.string,
  id                : PropTypes.string.isRequired,
  title             : PropTypes.string.isRequired,
  voteOnPost        : PropTypes.func.isRequired,
  voteScore         : PropTypes.number.isRequired
};

PostCard.defaultProps = {
  excerpt: ''
};

const mapStateToProps = (state, props) => ({
  activeCommentCount: commentsSelectors.getCommentCountForPostId(state, props.id)
});

export default connect(mapStateToProps, {
  voteOnPost: postsActions.voteOnPost
})(PostCard);
