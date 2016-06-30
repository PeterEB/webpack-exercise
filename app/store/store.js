// import actionType from '../actionType';

var EventEmitter = require('events').EventEmitter;

var initState = {
        number: 0
    },
    ownState = {
        number: 0
    };

var appStore = Object.assign({}, EventEmitter.prototype, {
    registerDispatcher: function(dispatcher) {
        dispatcher.register(this.getDispatchToken);
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

    getReducer: function () {
        return dispatchToken;
    },

    getDispatchToken: function (action) {
        return dispatchToken(null, action);
    }
});

function dispatchToken(state, action) {
console.log('store' + state);
    if (!state)
        state = initState;

    switch(action.type) {
        case 'ADD':
            ownState.number += action.number;
            appStore.emitChange();

            return Object.assign({}, state, { number: ownState.number });
            // break;
        default:
    }
}

module.exports = appStore;
