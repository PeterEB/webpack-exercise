var React = require('react'),
    ReactDOM = require('react-dom');

function uniqueId(prefix) {
    return prefix + Math.floor(Math.random() * 1000);
}

var AnswerRadioInput = React.createClass({
    propType: {
        checked: React.PropTypes.bool,
        onChanged: React.PropTypes.func.isRequired
    },
    handleClick: function (evt) {
        var checked = evt.target.checked;
        
        if (checked)
            this.props.onChanged(this.props.value);
    },
    render: function () {
        return (
            <div>
                <label htmlFor={this.props.id}>
                    <input type="radio" id={this.props.id} name={this.props.name} value={this.props.value} 
                           checked={this.props.checked} onChange={this.handleClick} />
                    {this.props.label}
                </label>
            </div>
        );
    }
});

var AnswerMultipleChoiceQuestion = React.createClass({
    propType: {
        value: React.PropTypes.string,
        choices: React.PropTypes.array.isRequired,
        onCompleted: React.PropTypes.func
    },
    getInitialState: function () {
        return {
            id: uniqueId('multiple-choice-'),
            value: this.props.value
        };
    },
    handleChanged: function (value) {
        this.setState({value: value});

        if (this.props.onCompleted)
            this.props.onCompleted(value);
    },
    renderChoices: function () {
        return this.props.choices.map(function (choice, i) {
            var radioProp = {
                id: "choice-" + i,
                name: this.state.id,
                label: choice,
                value: choice,
                checked: this.state.value === choice,
                onChanged: this.handleChanged
            };
            return <AnswerRadioInput {...radioProp} />;
        }.bind(this));
    },
    render: function () {
        return (
            <div>
                <label htmlFor={this.state.id}>
                    {this.props.label}
                </label>

                <div>
                    {this.renderChoices()}    
                </div>

            </div>
        )
    }
})

ReactDOM.render(
    <AnswerMultipleChoiceQuestion label="myMultipleChoices" choices={['apple', 'bananna', 'orange']} value='apple'/>,
    document.getElementById("mybody")
);
