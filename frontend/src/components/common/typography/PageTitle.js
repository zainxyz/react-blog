import PropTypes from 'prop-types';
import React, { Component } from 'react';
import isEmpty from 'lodash/isEmpty';
import { Button, Jumbotron } from 'reactstrap';
import { connect } from 'react-redux';
import { Background, Parallax } from 'react-parallax';

import { MODAL_NAMES, importAll } from 'utils';
import { actions as modalsActions } from 'modules/modals';

const categoryImages = importAll(require.context('static/page-title', false, /\.(png|jpe?g|svg)$/));

export const buildPageTitleImgURL = imageId => categoryImages[imageId];

/**
 * Class for building the page title with an optional titlePrefix and subtitle
 * @class
 * @extends {Component}
 */
class PageTitle extends Component {
  addNewPost = () => this.props.toggleModal(MODAL_NAMES.NEW_POST_MODAL);

  renderAddNewPostsButton = () => (
    <Button className="mt-3" color="primary" onClick={this.addNewPost}>
      Add a New Post
    </Button>
  );

  renderSubtitle = () => {
    const { subtitle } = this.props;

    if (!isEmpty(subtitle)) {
      return <footer className="blockquote-footer lead text-center text-light">{subtitle}</footer>;
    }

    return null;
  };

  renderTitle = () => {
    const { title, titlePrefix } = this.props;

    if (!isEmpty(title) && !isEmpty(titlePrefix)) {
      return <span className="font-weight-normal">{title}</span>;
    } else if (!isEmpty(title)) {
      return <span>{title}</span>;
    }

    return null;
  };

  renderTitlePrefix = () => {
    const { titlePrefix } = this.props;

    if (!isEmpty(titlePrefix)) {
      return <span>{titlePrefix} </span>;
    }

    return null;
  };

  render() {
    const { imgURL } = this.props;

    return (
      <Parallax strength={750} className="page-title">
        <Background className="page-title__background">
          <img src={buildPageTitleImgURL(imgURL)} alt={imgURL} />
        </Background>
        <Jumbotron className="page-title__jumbotron text-center">
          <div className="page-title__jumbotron__overlay" />
          <div className="page-title__jumbotron__content">
            <div>
              <h1 className="display-4 text-light">
                {this.renderTitlePrefix()}
                {this.renderTitle()}
              </h1>
              {this.renderSubtitle()}
              {this.renderAddNewPostsButton()}
            </div>
          </div>
        </Jumbotron>
      </Parallax>
    );
  }
}

PageTitle.propTypes = {
  imgURL     : PropTypes.string,
  subtitle   : PropTypes.string,
  title      : PropTypes.string,
  titlePrefix: PropTypes.string,
  toggleModal: PropTypes.func.isRequired
};

PageTitle.defaultProps = {
  imgURL     : '',
  subtitle   : '',
  title      : '',
  titlePrefix: ''
};

export default connect(null, {
  toggleModal: modalsActions.toggleModalById
})(PageTitle);
