import PropTypes from 'prop-types';
import React, { Component } from 'react';
import isEmpty from 'lodash/isEmpty';
import { Button, Jumbotron } from 'reactstrap';
import { connect } from 'react-redux';

import { MODAL_NAMES } from 'utils';
import { actions as modalsActions } from 'modules/modals';

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
      return <footer className="blockquote-footer lead text-center">{subtitle}</footer>;
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
    return (
      <Jumbotron className="page-title text-center">
        <h1 className="display-4">
          {this.renderTitlePrefix()}
          {this.renderTitle()}
        </h1>
        {this.renderSubtitle()}
        {this.renderAddNewPostsButton()}
      </Jumbotron>
    );
  }
}

PageTitle.propTypes = {
  subtitle   : PropTypes.string,
  title      : PropTypes.string,
  titlePrefix: PropTypes.string,
  toggleModal: PropTypes.func.isRequired
};

PageTitle.defaultProps = {
  subtitle   : '',
  title      : '',
  titlePrefix: ''
};

export default connect(null, {
  toggleModal: modalsActions.toggleModalById
})(PageTitle);
