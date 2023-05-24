import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, combineReducers, compose, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from 'redux-logger';
import {Provider} from 'react-redux';

import Main from 'components/Main.jsx';
import {unit, weather, weatherForm, forecast} from 'states/weather-reducers.js';
import {searchText, post, postForm, postItem} from 'states/post-reducers.js';
import {todoForm, todo} from 'states/todo-reducers.js';
import {main} from 'states/main-reducers.js';
import Amplify from 'aws-amplify';
import config from './aws-exports';
import { Auth } from '@aws-amplify/auth';

import 'bootstrap/dist/css/bootstrap.css';

Amplify.configure(config);
Auth.configure(config);

const federated = {
    googleClientId: "491537716617-k8tsecp47a86f2bgm0vo7p8f7j4gnl8d.apps.googleusercontent.com"
}

window.onload = function() {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const store = createStore(combineReducers({
        unit, weather, weatherForm, forecast,
        searchText, post, postForm, postItem,
        todoForm, todo,
        main,
    }), composeEnhancers(applyMiddleware(thunkMiddleware, loggerMiddleware)));

    ReactDOM.render(
        <Provider store={store}>
            <Main federated = {federated}/>
        </Provider>,
        document.getElementById('root')
    );
};
