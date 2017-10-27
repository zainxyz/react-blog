import PropTypes from 'prop-types';
import React, { Component } from 'react';
import isEmpty from 'lodash/isEmpty';
import { Button, Jumbotron } from 'reactstrap';
import { NavLink } from 'react-router-dom';

import { formatDate, getCommentCount } from 'utils';

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
      <span className="px-2 border-secondary">{`by: ${this.props.author}`}</span>
    ) : null;

  getDate = () =>
    this.props.timestamp ? (
      <span className="px-2 border-secondary">{formatDate(this.props.timestamp)}</span>
    ) : null;

  getCommentCount = () => (
    <span className="px-2 border-secondary">{getCommentCount(this.props.commentCount)}</span>
  );

  renderCategoryButtons = () =>
    this.props.category ? (
      <Button outline color="info" exact tag={NavLink} to={`/${this.props.category}`}>
        {this.props.category}
      </Button>
    ) : null;

  render() {
    return (
      <Jumbotron className="post-title">
        <h1 className="display-3 text-center pb-4">{this.getTitle()}</h1>
        <p className="text-center pb-2">
          {this.getAuthor()}
          {this.getDate()}
          {this.getCommentCount()}
        </p>
        <div className="category-btns text-center">{this.renderCategoryButtons()}</div>
      </Jumbotron>
    );
  }
}

PostTitle.propTypes = {
  author      : PropTypes.string,
  title       : PropTypes.string.isRequired,
  category    : PropTypes.string,
  timestamp   : PropTypes.number,
  commentCount: PropTypes.number
};

PostTitle.defaultProps = {
  author      : '',
  category    : '',
  timestamp   : '',
  commentCount: ''
};

export default PostTitle;
