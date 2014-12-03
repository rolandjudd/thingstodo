/** @jsx React.DOM */

var React = window.React = require('react')
    moment = require('moment');

// define the event
var Event = React.createClass({
    handleToggleComments: function () {
        if (this.state.comments == true) {
            this.setState({comments: false});
        } else {
            this.setState({comments: true});
        }
    },

    getInitialState: function () {
        return {comments: false};
    },

    render: function () {
        // require CommentBox.js logic
        var CommentBox = require('./CommentBox');
        // this.props = data passed from EventList
        var title = (
            <h2 className="title">{this.props.title}</h2>
        );

        var date = moment(this.props.startTime).format('MMM Do, h:mm a');
        var startTime = (
            <h4 className="startTime">{date}</h4>
        );
        var gUrl = window.location.origin + "/events"
        var url = gUrl + "/" + this.props.id + "/comments";
        // alert(url);
        // return dom 'event' element
        return (
            <div className="event">
                {title}
                {startTime}
                {this.props.children}
                <br />
                <br />
                <button type="button" className="btn btn-default btn-xs" onClick={this.handleToggleComments}>
                    Comments
                </button>
                {this.state.comments ? <CommentBox eventId={this.props.id} url={url} pollInterval={1000} /> : null}
                <hr />
            </div>
        );
    }
});

module.exports = Event;
