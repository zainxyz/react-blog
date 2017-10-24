import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect, Provider } from 'react-redux';

import { actions as categoryActions } from 'modules/categories';
import { actions as postsActions } from 'modules/posts';

import './App.css';
import { Categories, Home, Posts } from './views';
import { AppNav } from './common';

class App extends Component {
  componentDidMount() {
    this.props.fetchAllPosts();
    this.props.fetchAllCategories();
  }

  render() {
    const { brand, store } = this.props;
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div>
            <AppNav brand={brand} />
            <Route exact path="/" component={Home} />
            <Route exact path="/:categoryId" component={Categories} />
            <Route exact path="/:categoryId/:postId" component={Posts} />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

App.propTypes = {
  brand             : PropTypes.string.isRequired,
  fetchAllCategories: PropTypes.func.isRequired,
  fetchAllPosts     : PropTypes.func.isRequired,
  store             : PropTypes.object.isRequired
};

export default connect(null, {
  fetchAllCategories: categoryActions.fetchAllCategories,
  fetchAllPosts     : postsActions.fetchAllPosts
})(App);
