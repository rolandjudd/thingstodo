/** @jsx React.DOM */

var React = window.React = require('react'),
    Event = require('./Event');

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

module.exports = EventList;
