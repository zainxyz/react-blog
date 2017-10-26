import PropTypes from 'prop-types';
import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import './App.css';
import { AppNav } from './common';
import { Categories, Home, Posts } from './views';

const App = ({ brand, store }) => (
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

App.propTypes = {
  brand: PropTypes.string.isRequired,
  store: PropTypes.object.isRequired
};

export default App;
