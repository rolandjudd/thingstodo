/** @jsx React.DOM */

var React = window.React = require('react'),
    $ = require('jquery-browserify'),
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




var EventBox = React.createClass({
    loadEventsFromServer: function () {
        eventBox = this;
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            type: 'GET',
        })
          .done(function (data) {
              eventBox.setState({data: data});
          })
          .fail(function (xhr, status, err) {
              console.error(eventBox.props.url, status, err.toString());
          });
    },
    handleEventSubmit: function(event) {
        var response;
        var events = this.state.data;
        events.push(event);
        console.log(JSON.stringify(event));
        this.setState({data: events}, function() {
            eventBox = this;
            $.ajax({
                url: this.props.url,
                dataType: 'json',
                type: 'POST',
                data: JSON.stringify(event),
            })
              .done(function (data) {
                  eventBox.setState({data: data});
              })
              .fail(function (xhr, status, err) {
                  console.error(xhr.responseText);
                  alert(xhr.responseText);
                  console.error(eventBox.props.url, status, err.toString());
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
