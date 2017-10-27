import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { selectors as categorySelectors } from 'modules/categories';
import { PageTitle, PostsList } from 'components/common';
import { generateCategoryTitlePrefixes } from 'utils';

class Categories extends Component {
  getPageTitleProps = () => ({
    title      : this.props.category.title,
    subtitle   : this.props.category.subtitle,
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
  category: PropTypes.object
};

Categories.defaultProps = {
  category: {}
};

const mapStateToProps = (state, props) => ({
  category: categorySelectors.getCategoryById(state, props.match.params.categoryId)
});

export default connect(mapStateToProps)(Categories);
