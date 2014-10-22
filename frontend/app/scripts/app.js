/** @jsx React.DOM */

var React = window.React = require('react'),
    Autocomplete = require('./autocomplete'),
    $ = require('jquery-browserify'),
    mountNode = document.getElementById("app");

var Event = React.createClass({
    render: function () {
        return (
            <div className="event">
                <h2 className="title">
                    {this.props.title}
                </h2>
                {this.props.children}
            </div>
        )
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
    handleAutocomplete: function(coordinates) {
        this.setState({
            coordinates: coordinates
        });
        console.log(coordinates);
    },
    handleSubmit: function(e) {
        e.preventDefault()
        var title = this.refs.title.getDOMNode().value.trim();
        var description = this.refs.description.getDOMNode().value.trim();
        var date = this.refs.date.getDOMNode().value;
        var compl = this.refs.compl.getDOMNode().value;
        console.log(compl);

        if (!title || !description) {
            return;
        }
        this.props.onEventSubmit({
            title: title, 
            description: description,
            coordinates: coordinates
        });
        this.refs.title.getDOMNode().value = "";
        this.refs.description.getDOMNode().value = "";
        return;
    },
    render: function() {
        return (
            <form className="eventForm" onSubmit={this.handleSubmit}>
                <input type="text" placeholder="Event title" ref="title" />
                <input type="text" placeholder="Event description" ref="description" />
                <Autocomplete onUserInput={this.handleAutocomplete}/>
                <input type="datetime-local" ref="date" />
                <input type="submit" value="Post" />
            </form>
        )
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
                    console.error(this.props.url, status, err.toString());
                }.bind(this)
            });
        });
    },
    getInitialState: function () {
        return {data: []};
    },
    componentDidMount: function () {
        this.loadEventsFromServer();
        setInterval(this.loadEventsFromServer, this.props.pollInterval);
    },
    render: function () {
        return (
            <div className="eventBox">
                <h1>Events</h1>
                <EventList data={this.state.data} />
                <EventForm onEventSubmit={this.handleEventSubmit} />
            </div>
        );
    }
});


$(document).ready(function() {
    React.renderComponent(<EventBox url="http://localhost:3000/events" pollInterval={15000} />, mountNode);
});
