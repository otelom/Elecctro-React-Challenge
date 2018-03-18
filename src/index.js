import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from "react-redux";
import { createStore } from 'redux';
import reducer from "./reducers/reducers";
//import reducer from "./reducers/mainReducer";


let store = createStore(reducer)
//let store = createStore(todoApp, window.STATE_FROM_SERVER)
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'));
registerServiceWorker();
