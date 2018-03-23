import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from "react-redux";
//import { createStore } from 'redux';
import reducer from "./reducers/reducers";
//import reducer from "./reducers/mainReducer";

import * as storage from 'redux-storage'
import { createStore, applyMiddleware, combineReducers } from 'redux';
import createEngine from 'redux-storage-engine-localstorage';
//const reducer = storage.reducer(combineReducers(reducers));
const engine = createEngine('my-save-key');
const middleware = storage.createMiddleware(engine);
const createStoreWithMiddleware = applyMiddleware(middleware)(createStore);
const store = createStoreWithMiddleware(reducer);
const load = storage.createLoader(engine);
load(store)
    .then((newState) => console.log('Loaded state:', newState))
    .catch(() => console.log('Failed to load previous state'));


//let store = createStore(reducer)
//let store = createStore(todoApp, window.STATE_FROM_SERVER)
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'));
registerServiceWorker();
