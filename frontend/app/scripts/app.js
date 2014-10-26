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
        var date2 = this.refs.date2.getDOMNode().value;

        if (!title || !description) {
            return;
        }
        this.props.onEventSubmit({
            title: title, 
            description: description,
            coordinates: this.state.coordinates,
            start_time: date,
            end_time: date2,
        });
        this.refs.title.getDOMNode().value = "";
        this.refs.description.getDOMNode().value = "";
        this.refs.autocomplete.getDOMNode().value = "";
        this.refs.date.getDOMNode().value = "";
        this.refs.date2.getDOMNode().value = "";
        return;
    },
    render: function() {
        return (
            <form className="eventForm" onSubmit={this.handleSubmit}>
                <input type="text" placeholder="Event title" ref="title" />
                <input type="text" placeholder="Event description" ref="description" />
                <Autocomplete onUserInput={this.handleAutocomplete} ref="autocomplete"/>
                <div className="row">
                    <div className="col-sm-6">
                        <label htmlFor="start">Start Time</label>
                        <input type="datetime" id="start" ref="date" />
                    </div>
                    <div className="col-sm-6">
                        <label htmlFor="start">End Time</label>
                        <input type="datetime" ref="date2" />
                    </div>
                </div>
                <input type="submit" className="btn" value="Post" />
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
    handleToggleEventForm: function() {
        if (this.state.eventForm == true) {
            this.setState({eventForm: false});
        } else {
            this.setState({eventForm: true});
        }
        console.log(this.state.eventForm);
    },
    getInitialState: function () {
        return {data: [], eventForm: false};
    },
    componentDidMount: function () {
        this.loadEventsFromServer();
        setInterval(this.loadEventsFromServer, this.props.pollInterval);
    },
    render: function () {
        var eventForm;
        if (this.state.eventForm) {
            eventForm = (<EventForm onEventSubmit={this.handleEventSubmit} />);
        }
        return (
            <div className="eventBox">
                <nav className="navbar navbar-default navbar-fixed-top" role="navigation">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <a className="navbar-brand" href="#">TTD</a>
                        </div>
                        <div className="nav navbar-nav">
                            <button type="button" className="btn btn-default navbar-right"
                                onClick={this.handleToggleEventForm}>
                                Something show
                            </button>
                        </div>
                        {eventForm}
                    </div>
                </nav>
                <div className="container">
                    <EventList data={this.state.data} />
                </div>
            </div>
        );
    }
});


$(document).ready(function() {
    React.renderComponent(<EventBox url="http://localhost:3000/events" pollInterval={15000} />, mountNode);
});
