import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectors } from 'modules/categories';
import { PageTitle } from 'components/common';
import { generateCategoryTitlePrefixes } from 'utils';

class Categories extends Component {
  isCategoryIDAvailable = () =>
    this.props.match && this.props.match.params && this.props.match.params.categoryId;

  renderSubtitle = () => {
    if (this.isCategoryIDAvailable() && this.props.categories) {
      const subtitle = this.props.categories[this.props.match.params.categoryId].subtitle;
      return subtitle;
    }
    return null;
  };

  renderTitle = () => {
    if (this.isCategoryIDAvailable() && this.props.categories) {
      const title = this.props.categories[this.props.match.params.categoryId].title;
      return `${title}...`;
    }
    return 'Category...';
  };

  render() {
    return (
      <div>
        <PageTitle
          subtitle={this.renderSubtitle()}
          title={this.renderTitle()}
          titlePrefix={generateCategoryTitlePrefixes()}
        />
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
