import React from 'react';
import action from '../action/action';
import store from '../store/store';

var App = React.createClass({
    getInitialState: function () {
        return store.getState();
    },
    componentDidMount: function() {
        store.addChangeListener(this._onChange);
    },
    componentWillUnmount: function() {
        store.removeChangeListener(this._onChange);
    },
    handleClick: function () {
        action.add(1);
    },
    _onChange: function() {
        this.setState(store.getState());
    },
    render: function () {
        return (
            <div>
                <button onClick={this.handleClick}>add</button>
                <div>{this.state.number}</div>
            </div>
        )
    }
})

module.exports = App;
