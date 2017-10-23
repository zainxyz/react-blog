import React from 'react';
import { render } from 'react-dom';

import 'index.css';
import App from 'components/App';
import configureStore from 'configureStore';

import registerServiceWorker from './registerServiceWorker';

const store = configureStore();

render(<App brand="React Blog" store={store} />, document.getElementById('root'));
registerServiceWorker();
