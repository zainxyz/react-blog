import PropTypes from 'prop-types';
import React, { Component } from 'react';
import includes from 'lodash/includes';
import isEmpty from 'lodash/isEmpty';
import { connect } from 'react-redux';

import { PageTitle, PostsList } from 'components/common';
import { APP_ROUTE_NOT_FOUND, generateCategoryTitlePrefixes } from 'utils';
import { selectors as categorySelectors } from 'modules/categories';

class Categories extends Component {
  componentWillMount() {
    const { match, categoriesList } = this.props;

    if (
      isEmpty(match.params.categoryId) ||
      !includes(Object.keys(categoriesList), match.params.categoryId)
    ) {
      this.props.history.replace(APP_ROUTE_NOT_FOUND);
    }
  }

  getPageTitleProps = () => ({
    imgURL     : this.props.category.imgURL,
    subtitle   : this.props.category.subtitle,
    title      : this.props.category.title,
    titlePrefix: generateCategoryTitlePrefixes()
  });

  render() {
    return (
      <div className="categories-view">
        <PageTitle {...this.getPageTitleProps()} />
        <PostsList showPostsForCategory={this.props.category.title} />
      </div>
    );
  }
}

Categories.propTypes = {
  categoriesList: PropTypes.object,
  category      : PropTypes.object,
  history       : PropTypes.object.isRequired,
  match         : PropTypes.object.isRequired
};

Categories.defaultProps = {
  category      : {},
  categoriesList: {}
};

const mapStateToProps = (state, props) => ({
  category      : categorySelectors.getCategoryById(state, props.match.params.categoryId),
  categoriesList: categorySelectors.getAllCategories(state)
});

export default connect(mapStateToProps)(Categories);
