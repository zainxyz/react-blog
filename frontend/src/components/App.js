import React, { Component } from 'react';
import { connect } from 'react-redux';

import logo from 'assets/logo.svg';
import { actions as postsActions } from 'modules/posts';
import { actions as categoryActions } from 'modules/categories';

import './App.css';

class App extends Component {
  componentDidMount() {
    this.props.fetchAllPosts();
    this.props.fetchAllCategories();
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default connect(null, {
  fetchAllCategories: categoryActions.fetchAllCategories,
  fetchAllPosts     : postsActions.fetchAllPosts
})(App);
