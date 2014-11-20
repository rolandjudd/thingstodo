/** @jsx React.DOM */

var React = require('react');

var CommentForm = React.createClass({
    handleSubmit: function (e) {
        e.preventDefault()
        var comment = this.refs.comment.getDOMNode().value.trim();
        var eventId = this.props.eventId;

        if (!comment) {
            return;
        }

        this.props.onCommentSubmit({
            comment: comment,
            event_id: eventId
        });
        
        this.refs.comment.getDOMNode().value = "";
    },

    render: function() {
        return (
            <form className="commentForm" onSubmit={this.handleSubmit}>
                <input type="text" ref="comment" />
            </form>
        );
    }

});

module.exports = CommentForm;
