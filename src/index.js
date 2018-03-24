import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from "react-redux";
import reducer from "./reducers/reducers";
import thunk from 'redux-thunk';
import {createStore, applyMiddleware} from 'redux';

const store = createStore(reducer, applyMiddleware(thunk));

/*
    REDUX-STORAGE HAS BEEN DISABLED SINCE SERVER INTEGRATION

import createEngine from 'redux-storage-engine-localstorage';
import * as storage from 'redux-storage'
const engine = createEngine('my-save-key');

const middleware = storage.createMiddleware(engine);
const createStoreWithMiddleware = applyMiddleware(middleware)(createStore);

const load = storage.createLoader(engine);
load(store)
    .then((newState) => console.log('Loaded state:', newState))
    .catch(() => console.log('Failed to load previous state'));*/

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root'));
registerServiceWorker();