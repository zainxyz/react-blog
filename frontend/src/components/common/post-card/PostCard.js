import PropTypes from 'prop-types';
import React, { Component } from 'react';
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

class PostCard extends Component {
  deletePost = () => this.props.deletePost(this.props.id);

  renderPostExcerpt = excerpt => (
    <Truncate lines={2} ellipsis={<span>...</span>}>
      {excerpt}
    </Truncate>
  );

  render() {
    const {
      author,
      category,
      commentCount,
      excerpt,
      id,
      title,
      voteOnPost,
      voteScore
    } = this.props;
    return (
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
                <small>{getCommentCount(commentCount)}</small>
              </Col>
            </Row>
          </CardSubtitle>
          <CardText>{this.renderPostExcerpt(excerpt)}</CardText>
          <Button color="info" tag={NavLink} to={`/${category}/${id}`}>
            View Post
          </Button>
          <Button color="danger" onClick={this.deletePost}>
            Delete
          </Button>
        </CardBody>
      </Card>
    );
  }
}

PostCard.propTypes = {
  author      : PropTypes.string.isRequired,
  category    : PropTypes.string.isRequired,
  commentCount: PropTypes.number.isRequired,
  deletePost  : PropTypes.func.isRequired,
  excerpt     : PropTypes.string,
  id          : PropTypes.string.isRequired,
  title       : PropTypes.string.isRequired,
  voteOnPost  : PropTypes.func.isRequired,
  voteScore   : PropTypes.number.isRequired
};

PostCard.defaultProps = {
  excerpt: ''
};

export default connect(null, {
  deletePost: postsActions.deletePost,
  voteOnPost: postsActions.voteOnPost
})(PostCard);
