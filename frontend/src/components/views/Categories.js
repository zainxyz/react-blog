import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectors } from 'modules/categories';
import { PageTitle } from 'components/common';

class Categories extends Component {
  isCategoryIDAvailable = () =>
    this.props.match && this.props.match.params && this.props.match.params.categoryId;

  renderSubtitle = () => {
    if (this.isCategoryIDAvailable() && this.props.categories) {
      return this.props.categories[this.props.match.params.categoryId].subtitle;
    }
    return null;
  };

  renderTitle = () => {
    if (this.isCategoryIDAvailable()) {
      return `Welcome to Category: '${this.props.match.params.categoryId}'`;
    }
    return 'Welcome to Categories...';
  };

  render() {
    return (
      <div>
        <PageTitle title={this.renderTitle()} subtitle={this.renderSubtitle()} />
      </div>
    );
  }
}

Categories.propTypes = {
  categories: PropTypes.object.isRequired,
  match     : PropTypes.object.isRequired
};

Categories.defaultProps = {};

export default connect(
  createStructuredSelector({
    categories: selectors.getCategories
  })
)(Categories);
