/** @jsx React.DOM */

// require frontend javascript dependencies
var React = window.React = require('react'),
    $ = require('jquery-browserify'),
    mountNode = document.getElementById('app');

// create an address to query
// ex: gUrl = "http://0.0.0.0:3000/events"
var gUrl = window.location.origin + "/events"

// define the event
var Event = React.createClass({
    render: function () {
        // require CommentBox.js logic
        var CommentBox = require('./CommentBox');
        // this.props = data passed from EventList
        var title = (
            <h2 className="title">{this.props.title}</h2>
        );
        var url = gUrl + "/" + this.props.id + "/comments";
        // return dom 'event' element
        return (
            <div className="event">
                {title}
                {this.props.children}
                <CommentBox url={url} />
                <hr />
            </div>
        );
    }
});

var EventList = React.createClass({
    render: function () {
        // this.props = data passed from EventBox
        var eventNodes = this.props.data.map(function(event, index) {
            // propigate data to an <Event></Event>
            return (
                <Event
                    key={index}
                    id={event.id}
                    title={event.title}
                    category={event.category}
                    startTime={event.start_time}
                    endTime={event.end_time}
                    collapsable={true}
                >
                    {event.description}
                </Event>
            );
        });
        // create the eventList
        return (
            <div className="eventList card">
                {eventNodes}
            </div>
        );
    }
});




var EventBox = React.createClass({
    loadEventsFromServer: function () {
        eventBox = this;
        // ajax request for loading events
        $.ajax({
            url: gUrl,
            dataType: 'json',
            type: 'GET',
        })
          .done(function (data) {
              // handle success
              eventBox.setState({data: data});
          })
          .fail(function (xhr, status, err) {
              // handle failure
              console.error(eventBox.props.url, status, err.toString());
          });
    },
    // handle the sumbission of an event
    handleEventSubmit: function(event) {
        var response;
        var events = this.state.data;
        events.push(event);
        console.log(JSON.stringify(event));
        this.setState({data: events}, function() {
            eventBox = this;
            $.ajax({
                url: gUrl,
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
    // render the EventBox
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

// Document ready react load
$(document).ready(function() {
    var events_url = window.location.origin + "/events";
    React.renderComponent(<EventBox url={events_url} pollInterval={15000} />, mountNode);
});
