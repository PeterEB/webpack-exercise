import React from 'react';
import ReactDOM from 'react-dom';
import marked from 'marked';

import App from './components/AppRedux';
import action from './action/action';
import store from './store/store';

// import dispatcher from './dispatcher/dispatcher';

import { createStore } from 'redux';
import { Provider } from 'react-redux';

// action.bindDispatch(dispatcher);
// store.registerDispatcher(dispatcher);

var reduxStore = createStore(store.getReducer());

ReactDOM.render(
	<Provider store={reduxStore}>
    	<App />
    </Provider>,
    document.getElementById("mybody")
);
