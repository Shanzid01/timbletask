import React from 'react';
import ReactDom  from 'react-dom';
import App from './containers/app';
import SignIn from './containers/signin';
import SignUp from './containers/signup';
import {BrowserRouter, Route} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import reducer from './redux/reducers';

const store=createStore(reducer);

ReactDom.render(
    <Provider store={store}>
        <BrowserRouter>
            <Route exact path="/" component={App} />
            <Route path="/app" component={App} />
            <Route path="/signin" component={SignIn} />
            <Route path="/signup" component={SignUp} />
        </BrowserRouter>
    </Provider>
    , document.getElementById('root')
);