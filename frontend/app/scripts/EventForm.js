/** @jsx React.DOM */

var React = window.React = require('react'),
    Autocomplete = require('./autocomplete'),
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
        // 'grab' data from the DOM
        var title = this.refs.title.getDOMNode().value.trim();
        var description = this.refs.description.getDOMNode().value.trim();
        var coordinates = this.state.coordinates;
        var category = this.refs.category.getDOMNode().value;

        // validate title, description, coordinates
        if (!title || !description || !coordinates) {
            return;
        }

        // submit the event
        this.props.onEventSubmit({
            title: title,
            description: description,
            coordinates: coordinates,
            start_time: this.state.startDate.toISOString(),
            end_time: this.state.endDate.toISOString(),
            category: category
        });

        // reset the dom data
        this.refs.title.getDOMNode().value = "";
        this.refs.description.getDOMNode().value = "";
        this.refs.autocomplete.getDOMNode().value = "";
        return;
    },
    // logic for datePicker
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
    // initialize html for the form
    render: function() {
        var start = this.state.startDate.format('MMMM Do YYYY, h:mm a');
        var end = this.state.endDate.format('MMMM Do YYYY, h:mm a');
        var label = start + ' to ' + end;
        var categories = ['Pubcrawl', 'Sale', 'Party', 'Other'];
        var categoryInputs = categories.map(function (name, index) {
            return (<option value={name} key={index}>{name}</option>);
        });
        // return xml for the form
        return (
            <form className="eventForm container" onSubmit={this.handleSubmit}>
                <input type="text" placeholder="Event title" ref="title" required />
                <input type="text" placeholder="Event description" ref="description" required />
                <Autocomplete onUserInput={this.handleAutocomplete} ref="autocomplete"required />
                <DateRangePicker startDate={moment()} endDate={moment().add(1, 'days')}
                    timePicker={true} onApply={this.handleDate}>
                    <div className="btn btn-default">
                        <span className="glyphicon glyphicon-calendar"></span> {label}
                    </div>
                </DateRangePicker>
                <select ref="category">
                    {categoryInputs}
                </select>
                <input type="submit" value="Submit" />
            </form>
        );
    }
});

module.exports = EventForm;
