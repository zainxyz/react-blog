import BrowserRouter from 'react-router-dom/BrowserRouter';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Route from 'react-router-dom/Route';
import Switch from 'react-router-dom/Switch';
import WebFontLoader from '@dr-kobros/react-webfont-loader';
import { connect, Provider } from 'react-redux';

import 'components/App.css';
import { generateLoadingPageTitle, MODAL_NAMES, WEB_FONT_LOADER_CONFIG } from 'utils';
import { actions as modalsActions } from 'modules/modals';
import { actions as webfontsActions, selectors as webfontsSelectors } from 'modules/webfonts';

import {
  AppNav,
  DeleteCommentModal,
  DeletePostModal,
  EditCommentModal,
  EditPostModal,
  Loading,
  NewPostModal,
  ScrollToTop
} from './common';
import { Categories, Home, NotFound, PostDetails } from './views';

const loadingText = generateLoadingPageTitle();

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
    const { brand, store, webfontStatus } = this.props;

    return (
      <WebFontLoader config={WEB_FONT_LOADER_CONFIG} onStatus={this.webfontloaderOnStatus}>
        <Provider store={store}>
          <BrowserRouter>
            <ScrollToTop>
              <div className={`app-container ${webfontStatus}`}>
                <Loading text={loadingText} className={webfontStatus} />
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
  store           : PropTypes.object.isRequired,
  webfontStatus   : PropTypes.string.isRequired
};

App.defaultProps = {
  brand: 'React App'
};

export default connect(state => ({ webfontStatus: webfontsSelectors.getWebFontStatus(state) }), {
  addModal        : modalsActions.addModalById,
  setWebFontStatus: webfontsActions.setWebFontStatus
})(App);
