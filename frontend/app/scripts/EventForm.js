/** @jsx React.DOM */

var React = window.React = require('react'),
    Autocomplete = require('./autocomplete'),
    ReactBootstrap = require('react-bootstrap'),
    DateRangePicker = require('react-bootstrap-daterangepicker'),
    moment = require('moment');

var EventForm = React.createClass({
    handleAutocomplete: function(lat, lng) {
        this.setState({
            coordinates: [lat, lng]
        });
    },
    handleSubmit: function(e) {
        e.preventDefault()
        var title = this.refs.title.getValue().trim();
        var description = this.refs.description.getValue().trim();
        var coordinates = this.state.coordinates;
        var category = this.refs.category.getValue();

        if (!title || !description || !coordinates) {
            return;
        }
        this.props.onEventSubmit({
            title: title, 
            description: description,
            coordinates: coordinates,
            start_time: this.state.startDate.toISOString(),
            end_time: this.state.endDate.toISOString(),
            category: category
        });
        this.refs.title.getDOMNode().value = "";
        this.refs.description.getDOMNode().value = "";
        this.refs.autocomplete.getDOMNode().value = "";
        return;
    },
    handleDate: function (event, picker) {
        this.setState({
            startDate: picker.startDate,
            endDate: picker.endDate
        });
        console.log(picker.startDate);
    },
    getInitialState: function () {
        return ({
            startDate: moment(),
            endDate: moment().add(1, 'days'),

        });
    },
    render: function() {
        var start = this.state.startDate.format('MMMM Do YYYY, h:mm a');
        var end = this.state.endDate.format('MMMM Do YYYY, h:mm a');
        var label = start + ' to ' + end;
        var categories = ['Pubcrawl', 'Sale', 'Party', 'Other'];
        var categoryInputs = categories.map(function (name, index) {
            return (<option value={name} key={index}>{name}</option>);
        });
        var Button = ReactBootstrap.Button,
            Input = ReactBootstrap.Input,
            ButtonToolbar = ReactBootstrap.ButtonToolbar;

        return (
            <form className="eventForm" onSubmit={this.handleSubmit}>
                <Input type="text" placeholder="Event title" ref="title" required />
                <Input type="text" placeholder="Event description" ref="description" required />
                <Autocomplete onUserInput={this.handleAutocomplete} ref="autocomplete"required />
                <DateRangePicker startDate={moment()} endDate={moment().add(1, 'days')} 
                    timePicker={true} onApply={this.handleDate}>
                    <div className="btn btn-default">
                        <span className="glyphicon glyphicon-calendar"></span> {label}
                    </div>
                </DateRangePicker>
                <Input type="select" ref="category">
                    {categoryInputs}
                </Input>
                <Input type="submit" bsStyle="primary" value="Submit" />
            </form>
        );
    }
});

module.exports = EventForm;
