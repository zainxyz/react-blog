import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect, Provider } from 'react-redux';

import { actions as modalsActions } from 'modules/modals';
import { MODAL_NAMES } from 'utils';

import './App.css';
import { AppNav, NewPostModal, EditCommentModal } from './common';
import { Categories, Home, Posts } from './views';

class App extends Component {
  componentDidMount() {
    this.props.addModal(MODAL_NAMES.NEW_POST_MODAL);
    this.props.addModal(MODAL_NAMES.EDIT_COMMENT_MODAL);
    this.props.addModal(MODAL_NAMES.DELETE_COMMENT_MODAL);
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
            <NewPostModal />
            <EditCommentModal />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

App.propTypes = {
  addModal: PropTypes.func.isRequired,
  brand   : PropTypes.string.isRequired,
  store   : PropTypes.object.isRequired
};

export default connect(null, {
  addModal: modalsActions.addModalById
})(App);
