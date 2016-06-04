import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/Main';
import 'bootstrap/dist/css/bootstrap.css';
import { Provider } from 'react-redux';

import configureStore from './stores/configureStore';

var store = configureStore({});

// Render the main component into the dom
ReactDOM.render(<Provider store={store} ><App /></Provider>, document.getElementById('app'));
