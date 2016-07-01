import React from 'react';
import { PropTypes } from 'react';
import { connect } from 'react-redux';

import { add } from '../action/action';

var App = React.createClass({
    propTypes: {
        add: PropTypes.func.isRequired
    },
    handleClick: function () {
        this.props.add(1);
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
    return {
        number: state.number
    }
}

export default connect(
    mapStateToProps,
    { add }
)(App)
