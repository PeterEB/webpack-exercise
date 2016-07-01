import React from 'react';
import ReactDOM from 'react-dom';
import marked from 'marked';

import action from './action/action';
import store from './store/store';

/************/
/*** Flux ***/
/************/
import App from './components/App';

import dispatcher from './dispatcher/dispatcher';

action.register(dispatcher);
store.register(dispatcher);

ReactDOM.render(
    <App />,
    document.getElementById("mybody")
);

/*************/
/*** Redux ***/
/*************/
// import App from './components/AppRedux';

// import { createStore } from 'redux';
// import { Provider } from 'react-redux';

// var reduxStore = createStore(store.reduxReducer);

// ReactDOM.render(
//     <Provider store={reduxStore}>
//         <App />
//     </Provider>,
//     document.getElementById("mybody")
// );
