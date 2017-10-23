import PropTypes from 'prop-types';
import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import { Categories, Home } from './views';
import { AppNav } from './common';

const Root = ({ brand, store }) => (
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <AppNav brand={brand} />
        <Route exact path="/" component={Home} />
        <Route exact path="/categories" component={Categories} />
        <Route path="/categories/:categoryId" component={Categories} />
      </div>
    </BrowserRouter>
  </Provider>
);

Root.propTypes = {
  brand: PropTypes.string.isRequired,
  store: PropTypes.object.isRequired
};

export default Root;
