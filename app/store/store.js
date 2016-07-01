// import actionType from '../actionType';

var EventEmitter = require('events').EventEmitter;

var initState = {
        number: 0
    },
    ownState = {
        number: 0
    };

var appStore = Object.assign({}, EventEmitter.prototype, {
    register: function(dispatcher) {
        dispatcher.register(getFluxDispatchToken);
    },
    getState: function() {
        return ownState;
    },
    emitChange: function() {
        this.emit('change');
    },
    addChangeListener: function(callback) {
        this.on('change', callback);
    },
    removeChangeListener: function(callback) {
        this.removeListener('change', callback);
    },
    reduxReducer: dispatchToken
});

function getFluxDispatchToken(action) {
    return dispatchToken(null, action);
}

function dispatchToken(state, action) {
    if (typeof state === 'undefined')
        state = initState;

    switch(action.type) {
        case 'ADD':
            ownState.number += action.number;
            appStore.emitChange();
            return Object.assign({}, state, { number: ownState.number });
        default:
            return state;
    }
}

module.exports = appStore;
