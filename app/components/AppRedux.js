import React from 'react';
import action from '../action/action';
import store from '../store/store';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

var App = React.createClass({
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
                <div>{this.props.number}</div>
            </div>
        )
    }
})

function mapStateToProps(state) {
console.log('app' + state);
  return {
    number: state.number
  }
}

// module.exports = App;

export default connect(
  mapStateToProps,
  { action }
)(App)
