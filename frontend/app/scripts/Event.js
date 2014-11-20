/** @jsx React.DOM */

var React = window.React = require('react');

// define the event
var Event = React.createClass({
    render: function () {
        // require CommentBox.js logic
        var CommentBox = require('./CommentBox');
        // this.props = data passed from EventList
        var title = (
            <h2 className="title">{this.props.title}</h2>
        );
        var gUrl = window.location.origin + "/events"
        var url = gUrl + "/" + this.props.id + "/comments";
        // alert(url);
        // return dom 'event' element
        return (
            <div className="event">
            {title}
            {this.props.children}
            <CommentBox eventId={this.props.id} url={url} />
            <hr />
            </div>
        );
    }
});

module.exports = Event;
