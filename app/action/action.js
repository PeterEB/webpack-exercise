// import actionType from '../actionType';

var appAction = {
    _dispatcher: null,

    register: function (dispatcher) {
        appAction._dispatcher = dispatcher;
    },

    add: function (number) {
        return determine({
            type: 'ADD',
            number: number
        });
    }
};

function determine(data) {
    if(appAction._dispatcher) {
        appAction._dispatcher.dispatch(data);
    } else {
        return data;
    }
}

module.exports = appAction;