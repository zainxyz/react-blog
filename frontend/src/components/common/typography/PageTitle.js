import PropTypes from 'prop-types';
import React, { Component } from 'react';
import isEmpty from 'lodash/isEmpty';
import { Jumbotron } from 'reactstrap';

/**
 * Class for building the page title with an optional titlePrefix and subtitle
 * @class
 * @extends {Component}
 */
class PageTitle extends Component {
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
      <Jumbotron className="page-title">
        <h1 className="display-4 text-center">
          {this.renderTitlePrefix()}
          {this.renderTitle()}
        </h1>
        {this.renderSubtitle()}
      </Jumbotron>
    );
  }
}

PageTitle.propTypes = {
  subtitle   : PropTypes.string,
  title      : PropTypes.string.isRequired,
  titlePrefix: PropTypes.string
};

PageTitle.defaultProps = {
  subtitle   : '',
  titlePrefix: ''
};

export default PageTitle;
