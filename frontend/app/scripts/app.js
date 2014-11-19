/** @jsx React.DOM */

var React = window.React = require('react'),
    $ = require('jquery-browserify'),
    ReactBootstrap = require('react-bootstrap'),
    mountNode = document.getElementById('app');

var Event = React.createClass({
    render: function () {
        return (
            <div className="event">
                <h2 className="title">
                    {this.props.title}
                </h2>
                {this.props.children}
            </div>
        );
    }
});

var EventList = React.createClass({
    render: function () {
        var eventNodes = this.props.data.map(function(event, index) {
            return (
                <Event title={event.title} key={index}>
                    {event.description}
                </Event>
            );
        });
        return (
            <div className="eventList">
                {eventNodes}
            </div>
        );
    }
});


var EventForm = React.createClass({
    handleAutocomplete: function(lat, lng) {
        this.setState({
            coordinates: [lat, lng]
        });
    },
    handleSubmit: function(e) {
        e.preventDefault()
        var title = this.refs.title.getDOMNode().value.trim();
        var description = this.refs.description.getDOMNode().value.trim();
        var coordinates = this.state.coordinates;
        var category = this.refs.category.getDOMNode().value;

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

        return (
            <form className="eventForm container" onSubmit={this.handleSubmit}>
                <input type="text" placeholder="Event title" ref="title" required />
                <input type="text" placeholder="Event description" ref="description" required />
                <Autocomplete onUserInput={this.handleAutocomplete} ref="autocomplete"required />
                <div className="row">
                    <div className="col-md-8">
                        <DateRangePicker startDate={moment()} endDate={moment().add(1, 'days')} 
                            timePicker={true} onApply={this.handleDate}>
                            <div className="btn btn-default">
                                <span className="glyphicon glyphicon-calendar"></span> {label}
                            </div>
                        </DateRangePicker>
                    </div>
                    <div className="col-md-4">
                        <select className="form-control" ref="category">
                            {categoryInputs}
                        </select>
                    </div>
                </div>
                <input type="submit" className="btn btn-primary" value="Post" />
            </form>
        );
    }
});


var EventBox = React.createClass({
    loadEventsFromServer: function () {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            type: 'GET',
            success: function (data) {
                this.setState({data: data});
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    handleEventSubmit: function(event) {
        var response;
        var events = this.state.data;
        events.push(event);
        console.log(JSON.stringify(event));
        this.setState({data: events}, function() {
            $.ajax({
                url: this.props.url,
                dataType: 'json',
                type: 'POST',
                data: JSON.stringify(event),
                success: function(data) {
                    this.setState({data: data});
                }.bind(this),
                error: function (xhr, status, err) {
                    console.error(xhr.responseText);
                    console.error(this.props.url, status, err.toString());
                }.bind(this)
            });
        });
    },
    handleToggleEventForm: function() {
        if (this.state.eventForm == true) {
            this.setState({eventForm: false});
        } else {
            this.setState({eventForm: true});
        }
    },
    getInitialState: function () {
        return {data: [], eventForm: false};
    },
    componentDidMount: function () {
        this.loadEventsFromServer();
        setInterval(this.loadEventsFromServer, this.props.pollInterval);
    },
    render: function () {
        EventForm = require('./EventForm');
        return (
            <div className="eventBox">
                <nav className="navbar navbar-default navbar-fixed-top" role="navigation">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <a className="navbar-brand" href="#">TTD</a>
                        </div>
                        <div className="nav navbar-nav navbar-right">
                            <button type="button" className="btn btn-primary navbar-btn"
                                onClick={this.handleToggleEventForm}>
                                <span className="glyphicon glyphicon-plus"></span> Add Event
                            </button>
                        </div>
                    </div>
                    {this.state.eventForm ? <EventForm onEventSubmit={this.handleEventSubmit} /> : null}
                </nav>
                <div className="container">
                    <EventList data={this.state.data} />
                </div>
            </div>
        );
    }
});


$(document).ready(function() {
    var events_url = window.location.origin + "/events"
    React.renderComponent(<EventBox url={events_url} pollInterval={15000} />, mountNode);
});
