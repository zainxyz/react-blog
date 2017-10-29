import PropTypes from 'prop-types';
import React, { Component } from 'react';
import WebFontLoader from '@dr-kobros/react-webfont-loader';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect, Provider } from 'react-redux';

import { actions as modalsActions } from 'modules/modals';
import { actions as webfontsActions, selectors as webfontsSelectors } from 'modules/webfonts';
import { MODAL_NAMES, WEB_FONT_LOADER_CONFIG } from 'utils';

import './App.css';
import {
  AppNav,
  DeleteCommentModal,
  DeletePostModal,
  EditCommentModal,
  EditPostModal,
  NewPostModal,
  ScrollToTop
} from './common';
import { Categories, Home, NotFound, PostDetails } from './views';

class App extends Component {
  componentDidMount() {
    this.props.addModal(MODAL_NAMES.DELETE_COMMENT_MODAL);
    this.props.addModal(MODAL_NAMES.DELETE_POST_MODAL);
    this.props.addModal(MODAL_NAMES.EDIT_COMMENT_MODAL);
    this.props.addModal(MODAL_NAMES.EDIT_POST_MODAL);
    this.props.addModal(MODAL_NAMES.NEW_POST_MODAL);
  }

  webfontloaderOnStatus = status => {
    this.props.setWebFontStatus(status);
  };

  render() {
    const { brand, store } = this.props;

    return (
      <WebFontLoader config={WEB_FONT_LOADER_CONFIG} onStatus={this.webfontloaderOnStatus}>
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
                <EditPostModal />
                <NewPostModal />
              </div>
            </ScrollToTop>
          </BrowserRouter>
        </Provider>
      </WebFontLoader>
    );
  }
}

App.propTypes = {
  addModal        : PropTypes.func.isRequired,
  brand           : PropTypes.string,
  setWebFontStatus: PropTypes.func.isRequired,
  store           : PropTypes.object.isRequired
};

App.defaultProps = {
  brand: 'React App'
};

export default connect(state => ({ webfontStatus: webfontsSelectors.getWebFontStatus(state) }), {
  addModal        : modalsActions.addModalById,
  setWebFontStatus: webfontsActions.setWebFontStatus
})(App);
