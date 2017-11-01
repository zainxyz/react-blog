import PropTypes from 'prop-types';
import React, { Component } from 'react';
import isEmpty from 'lodash/isEmpty';
import { Background, Parallax } from 'react-parallax';
import { Button, Jumbotron } from 'reactstrap';
import { NavLink } from 'react-router-dom';

import { formatDate, getCommentsCount, importAll } from 'utils';

const postTitleImages = importAll(
  require.context('static/page-title', false, /\.(png|jpe?g|svg)$/)
);

export const buildPostTitleImgURL = imageId => postTitleImages[imageId];

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
    const { category, title } = this.props;

    return (
      <Parallax strength={750} className="post-title">
        <Background className="post-title__background">
          <img src={buildPostTitleImgURL(`${category}.jpg`)} alt={`${category} post: ${title}`} />
        </Background>
        <Jumbotron className="post-title__jumbotron">
          <div className="post-title__jumbotron__overlay" />
          <div className="post-title__jumbotron__content text-light">
            <h1 className="display-3 text-center pb-4">{this.getTitle()}</h1>
            <p className="text-center pb-2">
              {this.getAuthor()}
              {this.getDate()}
              {this.getCommentsCount()}
            </p>
            <div className="category-btns text-center">{this.renderCategoryButtons()}</div>
          </div>
        </Jumbotron>
      </Parallax>
    );
  }
}

PostTitle.propTypes = {
  author      : PropTypes.string.isRequired,
  category    : PropTypes.string.isRequired,
  commentCount: PropTypes.number,
  timestamp   : PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  title       : PropTypes.string.isRequired
};

PostTitle.defaultProps = {
  author      : '',
  commentCount: 0,
  id          : '',
  imgURL      : 'post-title.jpg',
  timestamp   : Date.now(),
  title       : '',
  voteOnPost  : () => {},
  voteScore   : 0
};

export default PostTitle;
