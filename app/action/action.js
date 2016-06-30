// import actionType from '../actionType';

var appAction = {
    dispatcher: null,

    bindDispatch: function (dispatcher) {
        this.dispatcher = dispatcher;
    },

    add: function (number) {
        if (this.dispatcher) {
            this.dispatcher.dispatch({
                type: 'ADD',
                number: number
            });
        } else {
            return function (dispatch) {
                dispatch({
                    type: 'ADD',
                    number: number 
                });
            };
        }
    }
};

module.exports = appAction;