import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect, Provider } from 'react-redux';

import { actions as modalsActions } from 'modules/modals';
import { MODAL_NAMES } from 'utils';

import './App.css';
import {
  AppNav,
  DeleteCommentModal,
  DeletePostModal,
  EditCommentModal,
  NewPostModal,
  ScrollToTop
} from './common';
import { Categories, Home, NotFound, PostDetails } from './views';

class App extends Component {
  componentDidMount() {
    this.props.addModal(MODAL_NAMES.DELETE_COMMENT_MODAL);
    this.props.addModal(MODAL_NAMES.DELETE_POST_MODAL);
    this.props.addModal(MODAL_NAMES.EDIT_COMMENT_MODAL);
    this.props.addModal(MODAL_NAMES.NEW_POST_MODAL);
  }

  render() {
    const { brand, store } = this.props;
    return (
      <Provider store={store}>
        <BrowserRouter>
          <ScrollToTop>
            <div>
              <AppNav brand={brand} />
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/category/:categoryId" component={Categories} />
                <Route exact path="/category/:categoryId/:postId" component={PostDetails} />
                <Route component={NotFound} />
              </Switch>
              <DeleteCommentModal />
              <DeletePostModal />
              <EditCommentModal />
              <NewPostModal />
            </div>
          </ScrollToTop>
        </BrowserRouter>
      </Provider>
    );
  }
}

App.propTypes = {
  addModal: PropTypes.func.isRequired,
  brand   : PropTypes.string,
  store   : PropTypes.object.isRequired
};

App.defaultProps = {
  brand: 'React App'
};

export default connect(null, {
  addModal: modalsActions.addModalById
})(App);
