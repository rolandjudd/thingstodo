/** @jsx React.DOM */

var React = window.React = require('react'),
    EventList = require('./EventList');

var EventBox = React.createClass({
    loadEventsFromServer: function () {
        var eventBox = this;
        // ajax request for loading events
        gUrl = window.location.origin + "/events";
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
        var eventBox = this;
        var url = window.location.origin + "/events";
        var events = this.state.data;
        events.push(event);
        console.log(JSON.stringify(event));

        this.setState({data: events}, function() {
            $.ajax({
                url: url,
                dataType: 'json',
                type: 'POST',
                data: JSON.stringify(event)
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

module.exports = EventBox;
