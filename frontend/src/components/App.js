import BrowserRouter from 'react-router-dom/BrowserRouter';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Route from 'react-router-dom/Route';
import WebFontLoader from '@dr-kobros/react-webfont-loader';
import { connect, Provider } from 'react-redux';
import { AnimatedSwitch } from 'react-router-transition';

import { actions as modalsActions } from 'modules/modals';
import { actions as webfontsActions, selectors as webfontsSelectors } from 'modules/webfonts';
import {
  MODAL_NAMES,
  WEB_FONT_LOADER_CONFIG,
  SWITCH_ROUTE_BOUNCE_TRANSITION,
  switchRouteMapStyles
} from 'utils';

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
                <AnimatedSwitch
                  atEnter={SWITCH_ROUTE_BOUNCE_TRANSITION.atEnter}
                  atLeave={SWITCH_ROUTE_BOUNCE_TRANSITION.atLeave}
                  atActive={SWITCH_ROUTE_BOUNCE_TRANSITION.atActive}
                  mapStyles={switchRouteMapStyles}
                  className="animated-switch-wrapper"
                >
                  <Route exact path="/" component={Home} />
                  <Route exact path="/category/:categoryId" component={Categories} />
                  <Route exact path="/category/:categoryId/:postId" component={PostDetails} />
                  <Route component={NotFound} />
                </AnimatedSwitch>
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
