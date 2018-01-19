import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux'; 
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { persistStore } from 'redux-persist'; 

import configureStore from './store/configureStore'; 
let store = configureStore({});

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();