import PropTypes from 'prop-types';
import React, { Component } from 'react';
import isEmpty from 'lodash/isEmpty';
import { Button, Container, Jumbotron } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import { VoteScore } from 'components/common';
import { actions as postsActions } from 'modules/posts';
import { formatDate, getCommentsCount } from 'utils';

/**
 * Class for building the post title
 *
 * @class
 * @extends {Component}
 */
class PostTitle extends Component {
  getTitle = () => (!isEmpty(this.props.title) ? <span>{this.props.title}</span> : null);

  getAuthor = () =>
    !isEmpty(this.props.author) ? (
      <span className="px-2 border-secondary text-truncate">{`by: ${this.props.author}`}</span>
    ) : null;

  getDate = () =>
    this.props.timestamp ? (
      <span className="px-2 border-secondary">{formatDate(this.props.timestamp)}</span>
    ) : null;

  getCommentsCount = () => (
    <span className="px-2 border-secondary">{getCommentsCount(this.props.commentCount)}</span>
  );

  renderCategoryButtons = () =>
    this.props.category ? (
      <Button outline color="primary" exact tag={NavLink} to={`/category/${this.props.category}`}>
        {this.props.category}
      </Button>
    ) : null;

  render() {
    const { id, voteScore, voteOnPost } = this.props;

    return (
      <Jumbotron className="post-title">
        <h1 className="display-3 text-center pb-4">{this.getTitle()}</h1>
        <p className="text-center pb-2">
          {this.getAuthor()}
          {this.getDate()}
          {this.getCommentsCount()}
        </p>
        <div className="category-btns text-center">{this.renderCategoryButtons()}</div>
        <Container className="vote-on-post pb-0 pt-2">
          <VoteScore id={id} score={voteScore} onClick={voteOnPost} className="col-md-2" />
        </Container>
      </Jumbotron>
    );
  }
}

PostTitle.propTypes = {
  author      : PropTypes.string,
  category    : PropTypes.string,
  commentCount: PropTypes.number,
  timestamp   : PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  title       : PropTypes.string,
  voteScore   : PropTypes.number
};

PostTitle.defaultProps = {
  author      : '',
  category    : '',
  commentCount: 0,
  timestamp   : Date.now(),
  title       : '',
  voteScore   : 0
};

export default connect(null, {
  voteOnPost: postsActions.voteOnPost
})(PostTitle);
