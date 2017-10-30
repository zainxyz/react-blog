import PropTypes from 'prop-types';
import React, { Component } from 'react';
import _isEmpty from 'lodash/isEmpty';
import _map from 'lodash/map';
import _orderBy from 'lodash/orderBy';
import { Button, Col, Container, Row } from 'reactstrap';
import { connect } from 'react-redux';

import { PostCard, SectionTitle, SortingOptions } from 'components/common';
import { actions as modalsActions } from 'modules/modals';
import { actions as postsActions, selectors as postsSelectors } from 'modules/posts';
import { actions as sortingActions, selectors as sortingSelectors } from 'modules/sorting';
import { generateKey, getTotalPostsCount, MODAL_NAMES } from 'utils';

class PostsList extends Component {
  componentDidMount() {
    const { showPostsForCategory } = this.props;

    if (_isEmpty(showPostsForCategory)) {
      this.props.fetchAllPosts();
    } else {
      this.props.fetchPostsByCategory(showPostsForCategory.toLowerCase());
    }
  }

  getSectionTitle = () => {
    const { posts, showPostsForCategory, postsByCategory } = this.props;
    const postsList = !_isEmpty(showPostsForCategory) ? postsByCategory : posts;

    const postsCount = getTotalPostsCount(postsList);

    return !_isEmpty(this.props.showPostsForCategory)
      ? `${postsCount} Post(s) for ${this.props.showPostsForCategory}`
      : `${postsCount} Total Post(s)`;
  };

  addNewPost = () =>
    this.props.toggleModal(MODAL_NAMES.NEW_POST_MODAL, {
      category: this.props.showPostsForCategory.toLowerCase()
    });

  renderPosts = () => {
    const { posts, postsByCategory, showPostsForCategory, sortingOptions } = this.props;
    const { sortBy, orderBy } = sortingOptions;

    const postsList = !_isEmpty(showPostsForCategory) ? postsByCategory : posts;

    const sortedPostsList = _orderBy(postsList, [sortBy], [orderBy]);

    if (!_isEmpty(sortedPostsList)) {
      return _map(sortedPostsList, post => (
        <Col sm="12" md="3" className="mb-5" key={generateKey()}>
          <PostCard {...post} buttonText="View Post" />
        </Col>
      ));
    }

    return (
      <Col>
        <p className="lead">
          Sorry, <span className="font-weight-bold">{showPostsForCategory}</span> does not have any
          posts associated with it.
        </p>
        <Button color="primary" onClick={this.addNewPost}>
          {`Add a New Post for the '${showPostsForCategory}' category`}
        </Button>
      </Col>
    );
  };

  renderSortingOptions = () => {
    const { sortingOptions } = this.props;
    const { sortBy, orderBy } = sortingOptions;

    return <SortingOptions onChange={this.props.setSortingOptions} values={{ sortBy, orderBy }} />;
  };

  render() {
    const { className } = this.props;

    return (
      <Container fluid className={className}>
        <SectionTitle title={this.getSectionTitle()}>{this.renderSortingOptions()}</SectionTitle>
        <Row>{this.renderPosts()}</Row>
      </Container>
    );
  }
}

PostsList.propTypes = {
  className           : PropTypes.string,
  fetchAllPosts       : PropTypes.func.isRequired,
  fetchPostsByCategory: PropTypes.func.isRequired,
  posts               : PropTypes.object.isRequired,
  postsByCategory     : PropTypes.object,
  setSortingOptions   : PropTypes.func.isRequired,
  showPostsForCategory: PropTypes.string,
  sortingOptions      : PropTypes.object.isRequired,
  toggleModal         : PropTypes.func.isRequired
};

PostsList.defaultProps = {
  className           : 'bg-light',
  postsByCategory     : {},
  showPostsForCategory: ''
};

const mapStateToProps = (state, props) => ({
  posts          : postsSelectors.getPosts(state),
  postsByCategory: postsSelectors.getPostsByCategoryId(state, props.showPostsForCategory),
  sortingOptions : sortingSelectors.getSortingOptionsForPosts(state)
});

export default connect(mapStateToProps, {
  fetchAllPosts       : postsActions.fetchAllPosts,
  fetchPostsByCategory: postsActions.fetchPostsByCategory,
  setSortingOptions   : sortingActions.setSortingOptionsForPosts,
  toggleModal         : modalsActions.toggleModalById
})(PostsList);
