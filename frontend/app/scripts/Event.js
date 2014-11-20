/** @jsx React.DOM */

var React = window.React = require('react');

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
        var gUrl = window.location.origin + "/events"
        var url = gUrl + "/" + this.props.id + "/comments";
        // alert(url);
        // return dom 'event' element
        return (
            <div className="event">
                {title}
                {this.props.children}
                <br />
                <br />
                <button type="button" className="btn btn-default btn-xs" onClick={this.handleToggleComments}>
                    Comments
                </button>
                {this.state.comments ? <CommentBox eventId={this.props.id} url={url} /> : null}
                <hr />
            </div>
        );
    }
});

module.exports = Event;
